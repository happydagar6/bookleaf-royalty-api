import express from 'express';
import { requestWithdrawal } from '../controllers/authorController.js';

const router = express.Router();

router.post('/', requestWithdrawal);

export default router;