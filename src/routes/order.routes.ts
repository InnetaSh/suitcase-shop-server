import { Router } from 'express';
import { orderController } from '../controllers/orderController.js';

const router = Router();


router.post('/users/:userId/orders', orderController.createOrder);

router.get('/users/:id/orders', orderController.getSuitcaseByUserId);

router.get('/orders/:id', orderController.findById);

router.patch('/orders/:id', orderController.updateOrder);

router.patch('/orders/:orderId/cancel/:userId', orderController.cancelOrder);

export default router;