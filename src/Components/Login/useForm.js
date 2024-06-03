import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    const { email, password } = formData;

    if (
      (email === "bis@gmail.com" && password === "hello") ||
      (email === "harry@gmail.com" && password === "wow")
    ) {
      // Save email to local storage
      localStorage.setItem("userEmail", email);
      localStorage.setItem("token", "true");
      navigate("/home");
    } else if (email === "admin@gmail.com" && password === "admin") {
      // Save email to local storage
      localStorage.setItem("userEmail", email);
      localStorage.setItem("token", "true");
      localStorage.setItem("mode", "admin");
      navigate("/adminhome");
    } else {
      setError("Please enter valid credentials");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    error,
  };
};

export default useForm;
