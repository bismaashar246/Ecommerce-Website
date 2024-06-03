import React from "react";

const OrderCard = ({ order }) => {
  // Calculate total amount for the order

  const items = order.items || [];

  return (
    <div className="border border-gray-300 p-4 rounded shadow-md mb-4">
      <h3 className="text-xl font-bold mb-2">Order #{order.id}</h3>
      <p>Order Date: {new Date(order.timestamp.toDate()).toLocaleString()}</p>
      <p>Amount is: Rs.{order.cartTotal}/-</p>
    </div>
  );
};

export default OrderCard;
