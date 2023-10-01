import React from "react";
import { ErrorMessage } from "formik";

interface FormErrorProps {
  name: string;
}

const FormError: React.FC<FormErrorProps> = ({ name }) => {
  const errorStyle: React.CSSProperties = {
    color: "red",
    fontSize: "0.8rem",
  };

  return (
    <div style={errorStyle}>
      <ErrorMessage name={name} />
    </div>
  );
};

export default FormError;
