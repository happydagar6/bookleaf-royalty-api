import {
  getAllAuthors,
  getAuthorById,
  calculateAuthorEarnings,
  calculateCurrentBalance,
  getAuthorBooks,
  getAuthorSales,
  createWithdrawal,
  getAuthorWithdrawals
} from '../services/royaltyService.js';
import { withdrawals } from '../data/seedData.js';


export const listAuthors = (req, res) => {
    const authors = getAllAuthors(); // Get all authors from the service

    const authorWithEarnings = authors.map(author => ({
        id: author.id,
        name: author.name,
        total_earnings: calculateAuthorEarnings(author.id),
        current_balance: calculateCurrentBalance(author.id)
    }));
    res.json(authorWithEarnings); // Send the list of authors with their earnings and balance as JSON response
};


export const getAuthorDetails = (req, res) => {
    const authorId = parseInt(req.params.id);
    const author = getAuthorById(authorId);

    if(!author) {
        return res.status(404).json({ error: "Author not found" });
    }

    const books = getAuthorBooks(authorId);
    const totalEarnings = calculateAuthorEarnings(authorId);
    const totalWithdrawn = withdrawals
        .filter(w => w.author_id === authorId)
        .reduce((sum, w) => sum + w.amount, 0);
    const currentBalance = totalEarnings - totalWithdrawn;

    res.json({
        id: author.id,
        name: author.name,
        email: author.email,
        current_balance: currentBalance,
        total_earnings: totalEarnings,
        total_books: books.length,
        books: books
    });
};


export const getAuthorSalesHistory = (req, res) => {
    const authorId = parseInt(req.params.id); // Get the author ID from the request parameters
    const author = getAuthorById(authorId); // Get the author details from the service

    if(!author) {
        return res.status(404).json({ error: "Author not found" }); // Return 404 if author is not found
    }
    
    const salesHistory = getAuthorSales(authorId); // Get the sales history for the author
    res.json(salesHistory);
};

export const requestWithdrawal = (req, res) => {
  const { author_id, amount } = req.body;

  // Validate author exists
  const author = getAuthorById(author_id);
  if (!author) {
    return res.status(404).json({ error: "Author not found" });
  }

  // Validate amount is a number
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  // Validate minimum withdrawal
  if (amount < 500) {
    return res.status(400).json({ 
      error: "Minimum withdrawal amount is ₹500" 
    });
  }

  // Check current balance
  const currentBalance = calculateCurrentBalance(author_id);
  if (amount > currentBalance) {
    return res.status(400).json({ 
      error: `Insufficient balance. Available: ₹${currentBalance}` 
    });
  }

  // Create withdrawal
  const withdrawal = createWithdrawal(author_id, amount);
  const newBalance = calculateCurrentBalance(author_id);

  res.status(201).json({
    id: withdrawal.id,
    author_id: withdrawal.author_id,
    amount: withdrawal.amount,
    status: withdrawal.status,
    created_at: withdrawal.created_at,
    new_balance: newBalance
  });
};

export const getWithdrawalHistory = (req, res) => {
    const authorId = parseInt(req.params.id); // Get the author ID from the request parameters
    const author = getAuthorById(authorId); // Get the author details from the service

    if(!author) {
        return res.status(404).json({ error: "Author not found" }); // Return 404 if author is not found
    }
    const withdrawalHistory = getAuthorWithdrawals(authorId); // Get the withdrawal history for the author
    res.json(withdrawalHistory);
};

