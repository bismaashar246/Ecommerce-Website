import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card } from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  ShoppingCartOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import {
  updateCartItem,
  addToCart
} from "../../Redux/cartSlice";

const { Meta } = Card;

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

  const handleQuantityChange2 = (productId, newQuantity, price) => {
    if (newQuantity < 1) {
      alert('Please select a quantity!');
      return;
    }

    if (existingItems.length === 0) {
      console.log("No existing items found for product ID:", productId);
      return;
    }

    const addedCount = newQuantity;

    newQuantity = newQuantity + existingItem.quantity;

    dispatch(
      updateCartItem({
        productId,
        quantity: newQuantity,
        cost: newQuantity * price,
        userid: userEmail,
      })
    );
    alert(`${addedCount} more ${existingItem.name} added to Cart! New Quantity is ${newQuantity}`);
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
    <Card
      bordered={false}
      cover={<img alt={name} src={image} className="h-40 w-full object-cover rounded mb-4" />}
    >
      <Meta title={name} description={`Rs.${price}/-`} />
      <p className="text-gray-500 mb-4">{description}</p>
      {user === "customer" && (
        <>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Button
              type="primary"
              icon={<MinusOutlined />}
              onClick={() => handleQuantityChange(-1)}
              disabled={selectedQuantity <= 0}
            />
            <span className="text-lg font-bold">{selectedQuantity}</span>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleQuantityChange(1)}
            />
          </div>
          {(!existingItem || existingItem.quantity === 0) && (
            <Button
              type="primary"
              onClick={handleAddToCart}
              className="mt-2"
              style={{ backgroundColor: 'green', borderColor: 'green' }}
              icon={<ShoppingCartOutlined />}
            >
              Add to Cart
            </Button>
          )}
          {existingItem && existingItem.quantity > 0 && (
            <Button
              type="primary"
              onClick={() => handleQuantityChange2(id, selectedQuantity, price)}
              className="mt-2"
              icon={<ShoppingCartOutlined />}
            >
              Update Cart
            </Button>
          )}
        </>
      )}
      {user === "admin" && (
        <Button
          type="danger"
          onClick={() => handleDelete(id, name)}
          className="mt-2"
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>
      )}
    </Card>
  );
};

export default ProductCard;
