import { Router } from 'express';
import { suitcaseController } from '../controllers/suitcaseController.js';
import { authMiddleware, requireRole } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', suitcaseController.getSuitcases);
router.get('/:id', suitcaseController.getSuitcaseById);

router.post('/', authMiddleware, requireRole('ADMIN'), suitcaseController.createSuitcase);
router.put('/:id', authMiddleware, requireRole('ADMIN'), suitcaseController.updateSuitcase);
router.delete('/:id', authMiddleware, requireRole('ADMIN'), suitcaseController.deleteSuitcase);

export default router;