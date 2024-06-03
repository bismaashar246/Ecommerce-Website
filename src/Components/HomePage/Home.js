import React, { useEffect, useState, useRef, useCallback } from "react";
import { getDocs, collection, query, orderBy, startAfter, limit} from "firebase/firestore";
import { db } from "../../firebase";
import Nav from "../NavBar/Nav";
import SearchBar from "../SearchBar/SearchBar";
//import { useDispatch, useSelector } from "react-redux";
//import { addToCart } from "../../Redux/cartSlice"; 
import ProductCard from "../Products/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchWord , setSearchWord] = useState("");
  //const dispatch = useDispatch();
  //const cartItems = useSelector((state) => state.cart.items);
  //const userEmail = localStorage.getItem("userEmail");
  const target = useRef(null);

  useEffect(() => {
    fetchInitialProducts(searchWord);
  }, [searchWord]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreProducts();
        }
      },
      { threshold: 1 }
    );
  
    const currentTarget = target.current; 
    if (currentTarget) {
      observer.observe(currentTarget);
    }
  
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [target, hasMore]); 
  


  //first time fetching
  const fetchInitialProducts = async (searchWord = "") => {
    try {
      let q = query(collection(db, "Products"), orderBy("name"), limit(9));
  
      const querySnapshot = await getDocs(q);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      let productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      if (searchWord.trim() !== "") {
        productsData = productsData.filter(product =>
          product.name.toLowerCase().includes(searchWord.toLowerCase())
        );
      }
  
      setProducts(productsData);
      setLastDoc(lastVisible);
      if (querySnapshot.docs.length < 9) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };
  
  //infinite fetching when 9 products in db displayed
  const fetchMoreProducts = async () => {
    try {
      const q = query(collection(db, "Products"), orderBy("name"), startAfter(lastDoc), limit(9));
      const querySnapshot = await getDocs(q);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts((prevProducts) => [...prevProducts, ...productsData]);
      setLastDoc(lastVisible);
      if (querySnapshot.docs.length < 9) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more products: ", error);
    }
  };

  /*const handleAddToCart = (product) => {
    if (product.quantity > 0) {
      dispatch(
        addToCart({
          userid: userEmail,
          productid: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: product.quantity,
          cost: product.quantity * product.price,
          flag: true,
        }),
      );
    } else {
      alert("Please select a quantity greater than 0");
    }
  };*/

  const handleSearch = useCallback((searchWord) => {
    setSearchWord(searchWord)
  }, []);

  /*const getQuantityInCart = (productId) => {
    const cartItem = cartItems.find(
      (item) => item.productid === productId && item.userid === userEmail,
    );
    return cartItem ? cartItem.quantity : 0;
  };*/

  return (
    <div className="bg-white">
      <Nav />
      <SearchBar onSearch={handleSearch} />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`} 
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              image={product.image}
              user="customer"
              //handleAddToCart={(updatedProduct) => handleAddToCart(updatedProduct)}
              quantityInCart= {0}
            />
          ))}
        </div>
        <div ref={target}></div>
      </div>
    </div>
  );
};

export default Home;
