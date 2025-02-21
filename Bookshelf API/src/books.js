const fs = require('fs');

const loadBooks = () => {
    try {
        const dataBuffer = fs.readFileSync('./src/books.json');
        return JSON.parse(dataBuffer);
    } catch (error) {
        return []; // If file doesn't exist, return an empty array
    }
};

const saveBooks = (books) => {
    fs.writeFileSync('./src/books.json', JSON.stringify(books, null, 2));
};

const books = loadBooks(); // Load data when the server starts

module.exports = { books, saveBooks };