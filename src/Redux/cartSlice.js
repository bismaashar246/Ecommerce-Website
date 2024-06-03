import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      console.log("I am adding the product");

      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productid === action.payload.productid &&
          item.userid === action.payload.userid,
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
        state.items[existingItemIndex].cost += action.payload.cost;
        alert("Quantity is increased in the cart!");
      } else {
        state.items.push(action.payload);
        alert("Added to Cart!");
      }
      console.log("The added product is: ", action.payload);
    },

    removeFromCart: (state, action) => {
      console.log("I am removing the product");
      state.items = state.items.filter(
        (item) => item.productid !== action.payload,
      );
      console.log("The removed product is: ", action.payload);
    },

    updateCartItem: (state, action) => {
      console.log("I am updating the product");
      const { productId, quantity, cost, userid } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productid === productId && item.userid === userid,
      );
      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.cost = cost;
      }
      console.log("The updated product is: ", action.payload);
    },

    clearCart: (state) => {
      state.items = [];
      console.log("The cart is empty");
    },
  },
});

export const { addToCart, removeFromCart, updateCartItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
