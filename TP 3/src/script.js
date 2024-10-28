"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function loadBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:3000/books');
        const books = yield response.json();
        const bookList = document.getElementById('book-list');
        // Display books
        bookList.innerHTML = books.map(book => `
    <div class="bg-white p-4 rounded-lg shadow-md">
      <h3 class="text-lg font-bold">${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages Read:</strong> ${book.pagesRead} of ${book.pages}</p>
      <p><strong>Status:</strong> ${book.status}</p>
      <p><strong>Progress:</strong> ${(book.pagesRead / book.pages * 100).toFixed(2)}%</p>
    </div>
  `).join('');
    });
}
function handleFormSubmit(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const book = Object.fromEntries(formData.entries());
        // Automatically mark as finished if pages read equals total pages
        book.finished = book.pagesRead === book.pages;
        yield fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book)
        });
        loadBooks();
        form.reset();
    });
}
// Event listener for form submission
document.getElementById('book-form').addEventListener('submit', handleFormSubmit);
loadBooks();
