import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItem,
  clearCart,
  addToCart
} from "../../Redux/cartSlice";

const ProductCard = ({
  id,
  name,
  price,
  description,
  image,
  user,
  handleDelete,
  quantityInCart,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(quantityInCart || 0);
  
  const state = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const userEmail = localStorage.getItem('userEmail');

  // Get items only for the user who signed in
  const userCartItems = state.filter((item) => item.userid === userEmail);

  const handleQuantityChange = (change) => {
    setSelectedQuantity((prevQuantity) => Math.max(0, prevQuantity + change));
  };

  const existingItems = userCartItems.filter((item) => item.productid === id);
  const existingItem = existingItems[0];

  // Update product count
  const handleQuantityChange2 = (productId, newQuantity, price) => {
    if (newQuantity < 1){
      alert('Please select quantity!')
      return;
    } 
    console.log("new quantity is:" + newQuantity);

    if (existingItems.length === 0) {
      console.log("No existing items found for product ID:", productId);
      return;
    }

    const addedCount = newQuantity;

    console.log("object:", existingItem);
    console.log("name:", existingItem.name);
    console.log("curr quantity:", existingItem.quantity);

    newQuantity = newQuantity + existingItem.quantity;

    console.log("updated count:", newQuantity);
    dispatch(
      updateCartItem({
        productId,
        quantity: newQuantity,
        cost: newQuantity * price,
        userid: userEmail,
      })
    );
    alert(`${addedCount} more ${existingItem.name} added to Cart! New Quantity is ${newQuantity}`)
    setSelectedQuantity(0);
  };

  const handleAddToCart = () => {
    if (selectedQuantity > 0) {
      dispatch(
        addToCart({
          userid: userEmail,
          productid: id,
          name: name,
          image: image,
          price: price,
          quantity: selectedQuantity,
          cost: selectedQuantity * price,
          flag: true,
        })
      );
    } else {
      alert("Please select a quantity greater than 0");
    }
    setSelectedQuantity(0);
  };

  return (
    <div className="border bg-gray-100 border-gray-300 p-4 rounded text-center">
      <img
        src={image}
        alt={name}
        className="h-40 w-full object-cover rounded mb-4"
      />
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-700 mb-2">Rs.{price}/-</p>
      <p className="text-gray-500 mb-4">{description}</p>

      {user === "customer" && (
        <>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="py-1 px-3 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition duration-200"
            >
              -
            </button>
            <span className="text-lg font-bold">{selectedQuantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="py-1 px-3 bg-green-500 text-white font-bold rounded hover:bg-green-700 transition duration-200"
            >
              +
            </button>
          </div>
          {(!existingItem || existingItem.quantity === 0) && (
            <button
              onClick={handleAddToCart}
              className="py-2 px-4 mt-2 bg-green-800 text-white font-bold rounded hover:bg-green-600 transition duration-200"
            >
              Add to Cart
            </button>
          )}
          {existingItem && existingItem.quantity > 0 && (
            <button
              onClick={() => handleQuantityChange2(id, selectedQuantity, price)}
              className="py-2 px-4 mt-2 bg-blue-800 text-white font-bold rounded hover:bg-green-600 transition duration-200"
            >
              Update Cart
            </button>
          )}
        </>
      )}

      {user === "admin" && (
        <button
          onClick={() => handleDelete(id, name)}
          className="py-2 px-4 bg-red-800 text-white font-bold rounded hover:bg-red-600 transition duration-200"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ProductCard;
