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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default.connect('mongodb://localhost:27017/Trackbook')
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
const bookSchema = new mongoose_1.default.Schema({
    title: String,
    author: String,
    pages: Number,
    pagesRead: { type: Number, default: 0 },
    finished: { type: Boolean, default: false },
});
const BookModel = mongoose_1.default.model('Book', bookSchema);
// CRUD Endpoints
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield BookModel.find();
    res.json(books);
}));
app.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = new BookModel(req.body);
    yield book.save();
    res.json(book);
}));
app.delete('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield BookModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
}));
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
