import React from "react";
import img from "../../Images/img.avif";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleloginuser = () => {
    navigate("/login");
  };

  const handleloginadmin = () => {
    navigate("/login");
  };

  return (
    <div
      className="flex items-center justify-end h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="mr-20 text-right transform -translate-y-32">
        <h1 className="text-8xl font-bold mb-20">Welcome to Plant Mart</h1>
        <div className="flex justify-center space-x-6">
          <button
            onClick={handleloginuser}
            className="py-4 px-10 bg-green-800 text-white font-bold rounded hover:bg-green-600 transition duration-200"
          >
            Log In as User
          </button>
          <button
            onClick={handleloginadmin}
            className="py-4 px-10 bg-green-800 text-white font-bold rounded hover:bg-green-600 transition duration-200"
          >
            Log In as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
