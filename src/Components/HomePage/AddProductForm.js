import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const AddProductForm = ({ onProductAdded, products }) => {
  const handleAddProduct = async (values, { setSubmitting, resetForm }) => {
    try {
      const productData = {
        ...values,
        price: parseFloat(values.price),
      };

      const docRef = await addDoc(collection(db, "Products"), productData);
      onProductAdded({ id: docRef.id, ...values });
      resetForm();
      console.log(`Product ${values.name} added.`);
      alert(`${values.name} is added successfully`);
    } catch (error) {
      console.error("Error adding product: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-green-50 shadow-lg rounded-lg p-6">
      <h2 className="text-2xl mb-4 text-green-900 font-bold text-center">
        Add New Product
      </h2>
      <Formik
        initialValues={{
          name: "",
          price: "",
          description: "",
          image: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (!values.price) {
            errors.price = "Required";
          } else if (isNaN(values.price)) {
            errors.price = "Must be a number";
          }
          if (!values.image) {
            errors.image = "Required";
          } else if (
            !/(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i.test(values.image)
          ) {
            errors.image = "Must be a valid image URL";
          } else if (
            products.some((product) => product.image === values.image)
          ) {
            errors.image = "Image URL must be unique";
          }
          return errors;
        }}
        onSubmit={handleAddProduct}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <Field
                type="text"
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Price</label>
              <Field
                type="text"
                name="price"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Description</label>
              <Field
                as="textarea"
                name="description"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600"
              />
            </div>
            <div>
              <label className="block text-gray-700">Image URL</label>
              <Field
                type="text"
                name="image"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-800 text-white p-2 rounded hover:bg-green-600 transition duration-200"
              disabled={isSubmitting}
            >
              Add Product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductForm;
