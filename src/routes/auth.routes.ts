import express from 'express';
import { getToken } from '../controllers/auth';

const router = express.Router();

router.route('/token').get(getToken);

export default router;