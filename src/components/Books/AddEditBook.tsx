import React, { useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormError from "../common/FormError";
import { useDispatch, useSelector } from "react-redux";
import { addBook, updateBook } from "../../redux/slice/bookSlice";
import { RootState } from "../../redux/Rootstate";

const AddEditBook: React.FC<any> = ({ selectedBook = {}, setSelectedBook }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const buttonOpenRef = useRef<HTMLButtonElement | null>(null);
  const initialValues = {
    title: selectedBook ? selectedBook?.title : "",
    author: selectedBook ? selectedBook?.author : "",
    genre: selectedBook ? selectedBook?.genre : "",
    publication_year: selectedBook ? selectedBook?.publication_year : "",
  };
  const books: any = useSelector((state: RootState) => state.books.books);

  useEffect(() => {
    selectedBook && buttonOpenRef && buttonOpenRef?.current?.click();
  }, [selectedBook]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    genre: Yup.string().required("Genre is required"),
    publication_year: Yup.number()
      .typeError("Publication year must be a number")
      .integer("Publication year must be an integer")
      .min(1000, "Publication year must be at least 1000")
      .max(new Date().getFullYear(), "Publication year cannot be in the future")
      .required("Publication year is required"),
  });
  const dispatch = useDispatch();

  const handleSubmit = async (values: typeof initialValues) => {
    const { title, author, publication_year, genre } = values;
    if (selectedBook) {
      await dispatch(
        updateBook({
          id: selectedBook.id,
          title,
          author,
          publication_year,
          genre,
        })
      );
      setSelectedBook(null);
    } else {
      await dispatch(
        addBook({
          id: books[books.length - 1]?.id + 1,
          title,
          author,
          publication_year,
          genre,
        })
      );
    }
    buttonRef.current?.click();
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          data-modal-target="add-edit-book-modal"
          data-modal-toggle="add-edit-book-modal"
          className="block m-5 text-right text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          ref={buttonOpenRef}
        >
          Add New Book
        </button>

        <div
          id="add-edit-book-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="add-edit-book-modal"
                data-modal-toggle="add-edit-book-modal"
                ref={buttonRef}
                onClick={() => setSelectedBook(null)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="px-6 py-6 lg:px-8">
                    <div className="space-y-6">
                      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                        {selectedBook ? "Update Book" : "Add New Book"}
                      </h3>
                      <div>
                        <label
                          htmlFor="title"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Title
                        </label>
                        <Field
                          type="text"
                          id="title"
                          name="title"
                          placeholder="Book Title"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        />
                        <FormError name="title" />
                      </div>
                      <div>
                        <label
                          htmlFor="author"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Author
                        </label>
                        <Field
                          type="text"
                          id="author"
                          name="author"
                          placeholder="Book Author"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        />
                        <FormError name="author" />
                      </div>
                      <div>
                        <label
                          htmlFor="publication_year"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Publication year
                        </label>
                        <Field
                          type="text"
                          id="publication_year"
                          name="publication_year"
                          placeholder="1999"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        />
                        <FormError name="publication_year" />
                      </div>
                      <div>
                        <label
                          htmlFor="genre"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Genre
                        </label>
                        <Field
                          type="text"
                          id="genre"
                          name="genre"
                          placeholder="Book genre"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        />
                        <FormError name="genre" />
                      </div>
                      <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        {selectedBook ? "Update Book" : "Add New Book"}
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditBook;
