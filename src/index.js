import express from 'express';
import cors from 'cors';
import authorRoutes from './routes/authorRoutes.js';
import withdrawalRoutes from './routes/withdrawalRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/authors', authorRoutes);
app.use('/withdrawals', withdrawalRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: "BookLeaf Author Royalty System API",
        endpoints: {
            authors: '/authors',
            authorDetails: '/authors/:id',
            authorSales: '/authors/:id/sales',
            withdrawals: '/withdrawals',
            authorWithdrawals: '/authors/:id/withdrawals'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

