import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import OrderCard from "./OrderCard";
import { Link } from "react-router-dom";
import Nav from "../NavBar/Nav";

const ShowOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = localStorage.getItem("userEmail");

  //get all the Orders from the Order db
  useEffect(() => {
    const fetchOrders = async () => {
      console.log("I am fetching the order");
      try {
        const orderQuery = query(
          collection(db, "Orders"),
          where("userId", "==", userEmail),
        );

        const ordersSnapshot = await getDocs(orderQuery);
        const ordersData = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        console.log("Fetched orders data: ", ordersData);
        setOrders(ordersData);
        //setOrders(ordersData.filter((order) => order.userId === userEmail));
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    if (userEmail) {
      fetchOrders();
    }
  }, [userEmail]);

  return (
    <div>
      <Nav />
      <h2 className="text-3xl font-bold mb-4 mt-5 text-center">My Orders</h2>
      <div className="container p-5 w-full max-w-2xl">
        {loading ? (
          <div className="flex justify-center items-center">
            <p>Loading orders...</p>
          </div>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Link to={`/orderdetails/${order.id}`} key={order.id}>
              <OrderCard order={order} />
            </Link>
          ))
        ) : (
          <p>Whoops! You have no confirmed orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default ShowOrders;
