import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import FormError from "./common/FormError";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [duplicateError, setDuplicateError] = useState<string | null>(null);
  const navigate: Function = useNavigate();

  const handleRegister = async (values: typeof initialValues) => {
    const { email, password } = values;
    const newUser = { email, password };

    const dbData = localStorage.getItem("db");
    const users = dbData ? JSON.parse(dbData).users : [];

    const isDuplicate = users.some((user: any) => user.email === email);
    if (isDuplicate) {
      setDuplicateError("Email already exists. Please use a different email.");
    } else {
      users.push(newUser);
      localStorage.setItem("db", JSON.stringify({ users }));
      localStorage.setItem("auth", email);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      )
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        <Form>
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create your account
                  </h1>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="name@company.com"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <FormError name="email" />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <Field
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                    />
                    <FormError name="password" />
                  </div>
                  {duplicateError && (
                    <div
                      className="bg-red-100 text-sm border border-red-400 text-red-700 px-4 py-3 rounded relative"
                      role="alert"
                    >
                      <span className="block sm:inline">{duplicateError}</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create an account
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Form>
      </Formik>
    </>
  );
};

export default RegisterPage;
