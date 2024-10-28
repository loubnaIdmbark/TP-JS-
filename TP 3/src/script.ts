interface Book {
  title: string;
  author: string;
  pages: number;
  status: string;
  price: number;
  pagesRead: number;
  format: string;
  suggestedBy: string;
  finished: boolean;
}

async function loadBooks(): Promise<void> {
  const response = await fetch('http://localhost:3000/books');
  const books: Book[] = await response.json();
  const bookList = document.getElementById('book-list') as HTMLElement;

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
}

async function handleFormSubmit(event: Event): Promise<void> {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const book = Object.fromEntries(formData.entries()) as unknown as Book;

  book.finished = book.pagesRead === book.pages;

  await fetch('http://localhost:3000/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  });

  loadBooks();
  form.reset();
}

// Event listener for form submission
document.getElementById('book-form')!.addEventListener('submit', handleFormSubmit);
loadBooks();
