import React from "react";
import displayimg from "../../Images/displayimg.jpg";
import { useNavigate } from "react-router-dom";

const Nav = ({ user }) => {
  var user = "customer";

  const navigate = useNavigate();

  if (localStorage.getItem("userEmail") === "admin@gmail.com") {
    user = "admin";
  }

  const handleClick = () => {
    localStorage.setItem("token", "false");
    navigate("/");
  };

  return (
    <div>
      <nav className="bg-green-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src={displayimg}
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-3xl font-bold">Plant Mart</span>
          </div>
          <div className="space-x-4">
            {user === "admin" && (
              <a href="/adminhome" className="hover:underline">
                Admin Home
              </a>
            )}
            <a href="/home" className="hover:underline">
              Home
            </a>
            <a href="/anthome" className="hover:underline">
              Ant Home
            </a>
            <a href="/showorders" className="hover:underline">
              My Orders
            </a>
            <a href="/mycart" className="hover:underline">
              My Cart
            </a>
            <button onClick={handleClick}>Sign Out</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
