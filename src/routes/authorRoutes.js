import express from 'express';
import {
    listAuthors,
    getAuthorDetails,
    getAuthorSalesHistory,
    getWithdrawalHistory
} from '../controllers/authorController.js';

const router = express.Router();

router.get('/', listAuthors); 
router.get('/:id', getAuthorDetails);
router.get('/:id/sales', getAuthorSalesHistory);
router.get('/:id/withdrawals', getWithdrawalHistory);

export default router;