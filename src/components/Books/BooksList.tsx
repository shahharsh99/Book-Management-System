import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Rootstate";
import { deleteBook } from "../../redux/slice/bookSlice";
import AddEditBook from "./AddEditBook";

const BooksList: React.FC = () => {
  const books: any = useSelector((state: RootState) => state.books.books);

  interface Book {
    id: number;
    title: string;
    author: string;
    publication_year: number | null;
    genre: string;
  }
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const dispatch = useDispatch();
  if (!Array.isArray(books)) {
    return <div>No books available!</div>;
  }

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
  };

  return (
    <div>
      <AddEditBook
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
      />
      <div className="relative overflow-x-auto my-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Publication Year
              </th>
              <th scope="col" className="px-6 py-3">
                Genre
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <>
                <tr
                  key={book.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {book.title}
                  </th>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">{book.publication_year}</td>
                  <td className="px-6 py-4">{book.genre}</td>
                  <td className="flex items-center px-6 py-4 space-x-3">
                    <p
                      onClick={() => handleEditBook(book)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </p>
                    <p
                      onClick={() => dispatch(deleteBook(book.id))}
                      className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </p>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooksList;
