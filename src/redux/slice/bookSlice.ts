import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Book {
  id: number;
  title: string;
  author: string;
  publication_year: number|null;
  genre: string;
}

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [
    {
      "id": 1,
      "title": "The Secret Garden",
      "author": "Frances Hodgson Burnett",
      "publication_year": 1911,
      "genre": "Children's Literature"
    },
    {
      "id": 2,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee",
      "publication_year": 1960,
      "genre": "Fiction"
    },
    {
      "id": 3,
      "title": "1984",
      "author": "George Orwell",
      "publication_year": 1949,
      "genre": "Dystopian"
    },
    {
      "id": 4,
      "title": "Pride and Prejudice",
      "author": "Jane Austen",
      "publication_year": 1813,
      "genre": "Classic Literature"
    },
    {
      "id": 5,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "publication_year": 1925,
      "genre": "Classic Literature"
    },
    {
      "id": 6,
      "title": "Harry Potter and the Sorcerer's Stone",
      "author": "J.K. Rowling",
      "publication_year": 1997,
      "genre": "Fantasy"
    },
    {
      "id": 7,
      "title": "The Hitchhiker's Guide to the Galaxy",
      "author": "Douglas Adams",
      "publication_year": 1979,
      "genre": "Science Fiction"
    },
    {
      "id": 8,
      "title": "The Catcher in the Rye",
      "author": "J.D. Salinger",
      "publication_year": 1951,
      "genre": "Fiction"
    },
    {
      "id": 9,
      "title": "The Hobbit",
      "author": "J.R.R. Tolkien",
      "publication_year": 1937,
      "genre": "Fantasy"
    },
    {
      "id": 10,
      "title": "The Hunger Games",
      "author": "Suzanne Collins",
      "publication_year": 2008,
      "genre": "Young Adult"
    }
  ],
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    deleteBook: (state, action: PayloadAction<number>) => {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
  },
});

export const { addBook, updateBook, deleteBook } = bookSlice.actions;
export default bookSlice.reducer;
