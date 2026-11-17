import { Router } from 'express';
import { suitcaseController } from '../controllers/suitcaseController.js';

const router = Router();

router.get('/', suitcaseController.getSuitcases);
router.post('/', suitcaseController.createSuitcase);

export default router;