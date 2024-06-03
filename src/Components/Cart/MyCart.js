import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../../Redux/cartSlice";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Nav from "../NavBar/Nav";

const MyCart = () => {
  const state = useSelector((state) => state.cart.items);
  const userEmail = localStorage.getItem("userEmail");

  console.log("I am called with: ", state);
  console.log("Current user is: " + userEmail);

  const dispatch = useDispatch();

  //get items onli for user who signed in
  const userCartItems = state.filter((item) => item.userid === userEmail);

  const cartTotal = userCartItems.reduce(
    (amount, item) => Number(item.cost) + Number(amount),
    0,
  );

  //if empty card is being confirmed
  const handleConfirm = async () => {
    if (userCartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      await addDoc(collection(db, "Orders"), {
        userId: userEmail,
        timestamp: new Date(),
        cartTotal: cartTotal,
        items: userCartItems,
      });

      dispatch(clearCart());
      alert("Your order is confirmed!");
    } catch (error) {
      console.error("Error confirming order: ", error);
    }
  };

  //delete the product from cart
  const handleDelete = (productId) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete?`);

    if (confirmDelete) {
      dispatch(removeFromCart(productId));
    }
  };

  //update product count
  const handleQuantityChange = (productId, newQuantity, price) => {
    if (newQuantity < 1) return;
    dispatch(
      updateCartItem({
        productId,
        quantity: newQuantity,
        cost: newQuantity * price,
        userid: userEmail,
      }),
    );
  };

  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4 mt-5 text-center">
          Good Choice! You have the following products in your cart:
        </h2>
        <div className="container p-5 w-full max-w-2xl">
          <div className="space-y-4">
            {userCartItems.map((cartItem) => (
              <div
                key={cartItem.productid}
                className="border border-gray-300 p-4 rounded shadow-md flex items-center justify-between"
              >
                <div className="flex flex-col items-center">
                  <h2 className="text-xl font-bold mb-2 text-center">
                    {cartItem.name}
                  </h2>
                  <img
                    src={cartItem.image}
                    alt={cartItem.name}
                    className="h-60 w-40 object-cover rounded mb-4"
                  />
                  <h3 className="text-gray-700 text-center">
                    Price: Rs.{cartItem.price}/-
                  </h3>
                  <div className="flex items-center space-x-2 mt-4">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          cartItem.productid,
                          cartItem.quantity - 1,
                          cartItem.price,
                        )
                      }
                      className="py-1 px-3 bg-red-500 text-white font-bold rounded hover:bg-red-700 transition duration-200"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          cartItem.productid,
                          cartItem.quantity + 1,
                          cartItem.price,
                        )
                      }
                      className="py-1 px-3 bg-green-500 text-white font-bold rounded hover:bg-green-700 transition duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <h3 className="py-2 px-10 mt-40 mr-5 text-gray-700 text-center">
                  Price: Rs.{cartItem.cost}/-
                </h3>
                <button
                  onClick={() => handleDelete(cartItem.productid)}
                  className="py-2 px-10 mt-40 mr-5 bg-red-500 text-white font-bold rounded hover:bg-red-800 transition duration-200"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <div className="text-lg font-bold">
              Total Order Cost: Rs.{cartTotal}/-
            </div>
            <button
              onClick={handleConfirm}
              className="py-2 px-4 mb-4 bg-green-800 text-white font-bold rounded hover:bg-green-600 transition duration-200"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
