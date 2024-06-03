import React, { useEffect, useState, useCallback } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Nav from "../NavBar/Nav";
import ProductCard from "../Products/ProductCard";
import SearchBar from "../SearchBar/SearchBar";
import AddProductForm from "./AddProductForm";

const AdminHome = () => {
  const [products, setProducts] = useState([]);

  const user = "admin";

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from Firestore
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

  // Delete a product from Firestore
  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`,
    );

    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, "Products", id));
        setProducts(products.filter((product) => product.id !== id));
        console.log(`Product ${name} deleted.`);
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    }
  };

  // Set the search word
  const handleSearch = useCallback((searchWord) => {
    fetchProducts(searchWord);
  }, []);

  // Handle product added
  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return (
    <div className="bg-white">
      <Nav />
      <div className="flex p-4">
        <div className="w-3/4 p-4">
          <SearchBar onSearch={handleSearch} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {products.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  image={product.image}
                  user={user}
                  handleDelete={() => handleDelete(product.id, product.name)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/4 p-4">
          <AddProductForm
            onProductAdded={handleProductAdded}
            products={products}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
