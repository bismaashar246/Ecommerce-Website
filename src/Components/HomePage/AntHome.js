import React, { useEffect, useState, useCallback } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import Nav from "../NavBar/Nav";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/cartSlice"; // Import the addToCart action
import AntCard from "../Products/AntCard";

const AntHome = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch(); // Redux dispatch function

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (searchWord = "") => {
    try {
      const querySnapshot = await getDocs(collection(db, "Products"));
      const productsData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((product) =>
          product.name.toLowerCase().includes(searchWord.toLowerCase()),
        );

      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const userEmail = localStorage.getItem("userEmail");

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        userid: userEmail,
        productid: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
        cost: product.price,
      }),
    );
  };

  const handleSearch = useCallback((searchWord) => {
    fetchProducts(searchWord);
  }, []);

  return (
    <div className="bg-white">
      <Nav />
      <SearchBar onSearch={handleSearch} />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <AntCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
              user="customer"
              handleAddToCart={() => handleAddToCart(product)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AntHome;