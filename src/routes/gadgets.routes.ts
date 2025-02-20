import express from 'express';
import { getGadgets, createGadget, updateGadget, deleteGadget, selfDestructGadget } from '../controllers/gadgets';

const router = express.Router();

router.route('/').get(getGadgets);
router.route('/').post(createGadget);
router.route('/:id').patch(updateGadget);
router.route('/:id').delete(deleteGadget);
router.route('/:id/self-destruct').post(selfDestructGadget);

export default router;