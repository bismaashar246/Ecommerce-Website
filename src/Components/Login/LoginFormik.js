import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const onSubmit = (values, { setSubmitting, setFieldError }) => {
    const { email, password } = values;

    if (
      (email === "bis@gmail.com" && password === "hello") ||
      (email === "harry@gmail.com" && password === "wow")
    ) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("token", "true");
      navigate("/home");
    } else if (email === "admin@gmail.com" && password === "admin") {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("token", "true");
      localStorage.setItem("mode", "admin");
      navigate("/adminhome");
    } else {
      setFieldError("general", "Please enter valid credentials");
    }

    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#99df99]">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Log in to view products at Plant Mart
        </h2>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-gray-700">Email:</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div>
                <label className="block text-gray-700">Password:</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-300"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-[#99df99] text-white font-bold rounded hover:bg-green-400 transition duration-200"
                disabled={isSubmitting}
              >
                Log in
              </button>
              {errors.general && (
                <p className="mt-4 text-red-600 text-center">
                  {errors.general}
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
