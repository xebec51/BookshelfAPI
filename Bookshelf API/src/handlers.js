const { nanoid } = require('nanoid');
const { books, saveBooks } = require('./books');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        return h.response({ status: 'fail', message: 'Gagal menambahkan buku. Mohon isi nama buku' }).code(400);
    }
    if (readPage > pageCount) {
        return h.response({ status: 'fail', message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' }).code(400);
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };
    books.push(newBook);
    saveBooks(books); // Save to JSON file

    return h.response({ status: 'success', message: 'Buku berhasil ditambahkan', data: { bookId: id } }).code(201);
};

const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;

    let filteredBooks = books;

    // Filter berdasarkan nama buku
    if (name) {
        filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }

    // Filter berdasarkan status membaca (reading)
    if (reading !== undefined) {
        filteredBooks = filteredBooks.filter((book) => book.reading === (reading === '1'));
    }

    // Filter berdasarkan status selesai (finished)
    if (finished !== undefined) {
        filteredBooks = filteredBooks.filter((book) => book.finished === (finished === '1'));
    }

    return h.response({
        status: 'success',
        data: { books: filteredBooks.map(({ id, name, publisher }) => ({ id, name, publisher })) },
    }).code(200);
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.find((b) => b.id === bookId);

    if (!book) {
        return h.response({ status: 'fail', message: 'Buku tidak ditemukan' }).code(404);
    }

    return h.response({ status: 'success', data: { book } }).code(200);
};

const updateBookHandler = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex === -1) {
        return h.response({ status: 'fail', message: 'Gagal memperbarui buku. Id tidak ditemukan' }).code(404);
    }
    if (!name) {
        return h.response({ status: 'fail', message: 'Gagal memperbarui buku. Mohon isi nama buku' }).code(400);
    }
    if (readPage > pageCount) {
        return h.response({ status: 'fail', message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount' }).code(400);
    }

    books[bookIndex] = {
        ...books[bookIndex],
        id: books[bookIndex].id, // Ensure id remains unchanged
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished: pageCount === readPage,
        reading,
        insertedAt: books[bookIndex].insertedAt, // Ensure insertedAt remains unchanged
        updatedAt: new Date().toISOString(),
    };

    saveBooks(books); // Save changes to JSON file

    return h.response({ status: 'success', message: 'Buku berhasil diperbarui' }).code(200);
};

const deleteBookHandler = (request, h) => {
    const { bookId } = request.params;

    const bookIndex = books.findIndex((book) => book.id === bookId);
    if (bookIndex === -1) {
        return h.response({ status: 'fail', message: 'Buku gagal dihapus. Id tidak ditemukan' }).code(404);
    }

    books.splice(bookIndex, 1);
    saveBooks(books); // Save changes to JSON file

    return h.response({ status: 'success', message: 'Buku berhasil dihapus' }).code(200);
};

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, updateBookHandler, deleteBookHandler };
