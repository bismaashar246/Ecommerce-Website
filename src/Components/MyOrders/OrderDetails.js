import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import Nav from "../NavBar/Nav";

const OrderDetails = () => {
  const { orderId } = useParams();
  console.log("order id is: " + orderId);
  const [order, setOrder] = useState("");

  useEffect(() => {
    //fetch the Order info from Order table
    console.log("I am fetching Order details");
    const fetchOrder = async () => {
      try {
        const orderDoc = await getDoc(doc(db, "Orders", orderId));
        if (orderDoc.exists()) {
          console.log("Order exists");
          const orderData = orderDoc.data();
          console.log("order data: ", orderData);

          if (!orderDoc.exists()) {
            console.log("Order does not exist");
          }
          setOrder(orderData);
        } else {
          console.error("No such order!");
        }
      } catch (error) {
        console.error("Error fetching order details: ", error);
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <div>
      <Nav />
      <h2 className="text-3xl font-bold mb-4 mt-5 text-center">
        Order Details
      </h2>
      <div className="container p-5 w-full max-w-2xl">
        <h3 className="text-xl font-bold mb-4">Order #{orderId}</h3>
        <div className="space-y-4">
          {order &&
            order.items &&
            order.items.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded shadow-md"
              >
                <div>
                  <h3 className="text-gray-700 text-2xl mb-2 font-bold">
                    {item.name}
                  </h3>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-60 w-40 object-cover rounded mb-4"
                  />
                </div>

                <p className="text-gray-700 mb-2">
                  Product ID: {item.productid}
                </p>
                <p className="text-gray-700 mb-2">Cost: Rs.{item.cost}/-</p>
                <p className="text-gray-700 mb-2">Quantity: {item.quantity}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
