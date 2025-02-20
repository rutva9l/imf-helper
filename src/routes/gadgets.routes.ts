import express from 'express';
import { authenticateToken } from '../utils/auth';
import { getGadgets, createGadget, updateGadget, deleteGadget, selfDestructGadget } from '../controllers/gadgets';

const router = express.Router();

router.route('/').get(authenticateToken, getGadgets);
router.route('/').post(authenticateToken, createGadget);
router.route('/:id').patch(authenticateToken, updateGadget);
router.route('/:id').delete(authenticateToken, deleteGadget);
router.route('/:id/self-destruct').post(authenticateToken, selfDestructGadget);

export default router;