import mongoose, { Document, Schema } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  pages: number;
  status: 'Read' | 'Re-read' | 'DNF' | 'Currently reading' | 'Returned Unread' | 'Want to read';
  price: number;
  pagesRead: number;
  format: 'Print' | 'PDF' | 'Ebook' | 'AudioBook';
  suggestedBy: string;
  finished: boolean;
  currentlyAt: () => number;
}

const bookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Read', 'Re-read', 'DNF', 'Currently reading', 'Returned Unread', 'Want to read'],
    required: true,
  },
  price: { type: Number, required: true },
  pagesRead: { type: Number, required: true, min: 0 },
  format: { type: String, enum: ['Print', 'PDF', 'Ebook', 'AudioBook'], required: true },
  suggestedBy: { type: String },
  finished: { type: Boolean, default: false },
});

// Method to calculate the percentage of reading progress
bookSchema.methods.currentlyAt = function (): number {
  return this.pages ? (this.pagesRead / this.pages) * 100 : 0;
};

const Book = mongoose.model<IBook>('Book', bookSchema);
export default Book;
