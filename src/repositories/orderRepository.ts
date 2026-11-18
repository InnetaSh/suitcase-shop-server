import { prisma } from '../lib/prisma.js';
import { CreateOrderDataDTO, UpdateOrderDataDTO } from '../types/order.types.js'

export const orderRepository = {
  async createOrder(data: CreateOrderDataDTO) {
    return await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: data.userId,
          shippingAddress: data.shippingAddress,
          phone: data.phone,
          totalPrice: data.totalPrice,
          items: {
            create: data.items.map((item) => ({
              suitcaseId: item.suitcaseId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      for (const item of data.items) {
        await tx.suitcase.update({
          where: { id: item.suitcaseId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return order;
    });
  },

  async findByUserId(userId: string) {
    return await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            suitcase: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findById(id: string) {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            suitcase: true,
          },
        },
        user: {
          select: { id: true, email: true, fullName: true },
        },
      },
    });
  },


  async update(id: string, data: UpdateOrderDataDTO) {
    return await prisma.order.update({
      where: { id },
      data: {
        shippingAddress: data.shippingAddress,
        phone: data.phone,
        totalPrice: data.totalPrice,
      },
      include: {
        items: true,
      },
    });
  },

};