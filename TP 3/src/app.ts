import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Trackbook')
  .then(() => console.log("MongoDB connected"))
  .catch((err: Error) => console.error("MongoDB connection error:", err));

// Define Book schema and model
interface Book extends mongoose.Document {
    title: string;
    author: string;
    pages: number;
    pagesRead: number;
    finished: boolean;
}

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    pages: Number,
    pagesRead: { type: Number, default: 0 },
    finished: { type: Boolean, default: false },
});

const BookModel = mongoose.model<Book>('Book', bookSchema);

// CRUD Endpoints
app.get('/books', async (req: Request, res: Response) => {
    const books = await BookModel.find();
    res.json(books);
});

app.post('/books', async (req: Request, res: Response) => {
    const book = new BookModel(req.body);
    await book.save();
    res.json(book);
});

app.delete('/books/:id', async (req: Request, res: Response) => {
    await BookModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));