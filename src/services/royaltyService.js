import { authors, books, sales, withdrawals } from '../data/seedData.js';

export const calculateAuthorEarnings = (authorId) => {
    const authorBooks = books.filter(book => book.author_id === authorId);
    let totalEarnings = 0;

    authorBooks.forEach(book => {
        const bookSales = sales.filter(sale => sale.book_id === book.id);
        const totalSold = bookSales.reduce((sum, sale) => sum + sale.quantity, 0);
        totalEarnings += totalSold * book.royalty_per_sale;
    });
    return totalEarnings;
};

export const calculateCurrentBalance = (authorId) => {
    const totalEarnings = calculateAuthorEarnings(authorId); // Calculate total earnings for the author
    const totalWithdrawn = withdrawals
    .filter(withdrawal => withdrawal.author_id === authorId)
    .reduce((sum, w) => sum + w.amount, 0); // Calculate total withdrawn amount for the author

    return totalEarnings - totalWithdrawn; // Current balance is total earnings minus total withdrawn
};

export const getAuthorBooks = (authorId) => {
    const authorBooks = books.filter(book => book.author_id === authorId);

    return authorBooks.map(book => {
        const bookSales = sales.filter(sale => sale.book_id === book.id);
        const totalSold = bookSales.reduce((sum, sale) => sum + sale.quantity, 0);
        const totalRoyalty = totalSold * book.royalty_per_sale;

        return {
            id: book.id,
            title: book.title,
            royalty_per_sale: book.royalty_per_sale,
            total_sold: totalSold,
            total_royalty: totalRoyalty
        };
    });
};


export const getAuthorSales = (authorId) => {
    const authorBooks = books.filter(book => book.author_id === authorId); // Get all books by the author
    const authorBookIds = authorBooks.map(book => book.id); // Get the IDs of the author's books

    const authorSales = sales
    .filter(sale => authorBookIds.includes(sale.book_id))
    .map(sale => {
        const book = books.find(b => b.id === sale.book_id);
        return {
            book_title: book.title,
            quantity: sale.quantity,
            royalty_earned: sale.quantity * book.royalty_per_sale,
            sale_date: sale.sale_date
        };
    })
    .sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date)); // Sort sales by date (newest first)

    return authorSales;
}


export const createWithdrawal = (authorId, amount) => {
    const withdrawal = {
        id: withdrawals.length + 1, // Generate a new ID based on the current length of withdrawals
        author_id: authorId,
        amount: amount,
        status: 'pending', // Set initial status to pending
        created_at: new Date().toISOString() // Record the creation date of the withdrawal
    };

    withdrawals.push(withdrawal); // Add the new withdrawal to the withdrawals array
    return withdrawal; // Return the created withdrawal object
};

export const getAuthorWithdrawals = (authorId) => {
    return withdrawals
    .filter(w => w.author_id === authorId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort withdrawals by creation date (newest first)
};

export const getAllAuthors = () => authors;
export const getAuthorById = (id) => authors.find(author => author.id === id);