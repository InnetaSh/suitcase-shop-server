import { orderRepository } from '../repositories/orderRepository.js';
import { prisma } from '../lib/prisma.js';
import { BadRequestException } from '../errors/BadRequestException.js';
import { NotFoundException } from '../errors/NotFoundException.js';
import { ErrorMessages } from '../constants/errorMessages.js';
import { CreateOrderDataDTO, UpdateOrderDataDTO, CreateOrderDTO } from '../types/order.types.js'


export const orderService = {
  async create(userId: string, dto: CreateOrderDTO) {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('Order must contain at least one item');
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let totalPrice = 0;
    const validatedItems = [];

    for (const item of dto.items) {
      const suitcase = await prisma.suitcase.findUnique({
        where: { id: item.suitcaseId },
      });

      if (!suitcase) {
        throw new NotFoundException(`Suitcase with id ${item.suitcaseId} not found`);
      }

      if (suitcase.inStock < item.quantity) {
        throw new BadRequestException(
          `Not enough stock for suitcase "${suitcase.title}". Available: ${suitcase.inStock}, requested: ${item.quantity}`
        );
      }

      const itemTotal = suitcase.price * item.quantity;
      totalPrice += itemTotal;

      validatedItems.push({
        suitcaseId: suitcase.id,
        quantity: item.quantity,
        price: suitcase.price,
      });
    }

    const order = await orderRepository.createOrder({
      userId,
      shippingAddress: dto.shippingAddress,
      phone: dto.phone,
      items: validatedItems,
      totalPrice,
    });

    return order;
  },

  async getUserOrders(userId: string) {
    return await orderRepository.findByUserId(userId);
  },

  async getOrderById(orderId: string) {
    const order = await orderRepository.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  },

  async update(id: string, data: UpdateOrderDataDTO) {
    const existingOrder = await orderRepository.findById(id);

    if (!existingOrder) {
      throw new NotFoundException(ErrorMessages.ORDER_NOT_FOUND);
    }

    const allowedData: UpdateOrderDataDTO = {
      shippingAddress: data.shippingAddress,
      phone: data.phone,
    };

    return await orderRepository.update(id, allowedData);
  },

  async cancelOrder(orderId: string, userId: string) {
    const order = await orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.userId !== userId) {
      throw new BadRequestException('You can only cancel your own orders');
    }

    if (order.status !== 'PENDING') {
      throw new BadRequestException('You can only cancel pending (unpaid) orders');
    }

    return await prisma.$transaction(async (tx) => {
      for (const item of order.items) {
        await tx.suitcase.update({
          where: { id: item.suitcaseId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      }

      return await tx.order.update({
        where: { id: orderId },
        data: { status: 'CANCELLED' },
        include: { items: true },
      });
    });
  }
};