import { Request, Response } from 'express';
import { orderService } from '../services/orderService.js';

export const orderController = {
  async getSuitcaseByUserId(req: Request, res: Response) {
      const { id } = req.params;
    const orders = await orderService.getUserOrders(id as string);
    res.status(200).json({ status: 'success', data: orders });
  },

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const order = await orderService.getOrderById(id as string);
    res.status(200).json({ status: 'success', data: order });
  },

  async createOrder(req: Request, res: Response) {
     const { userId } = req.params;
    const newOrder = await orderService.create(userId as string,req.body);
    res.status(201).json({ status: 'success', data: newOrder });
  },

  async updateOrder(req: Request, res: Response) {
    const { id } = req.params;
    const updatedOrder= await orderService.update(id as string, req.body);
    res.status(200).json({ status: 'success', data: updatedOrder });
  },

  async cancelOrder(req: Request, res: Response) {
    const { orderId, userId } = req.params;
    const deletedOrder = await orderService.cancelOrder(orderId  as string, userId as string);
    res.status(200).json({ status: 'success', data: deletedOrder });
  },
};