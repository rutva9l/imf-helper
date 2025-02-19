import express from 'express';
import { getGadgets, selfDestructGadget } from '../controllers/gadgets';

const router = express.Router();

router.route('/').get(getGadgets);
router.route('/:id/self-destruct').post(selfDestructGadget);

export default router;