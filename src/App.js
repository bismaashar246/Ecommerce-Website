import "./App.css";
import React from "react";


//importing dependencies
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRouting/ProtectedRoute";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";

//importing my components
import Landing from "./Components/LandingPage/Landing";
import Home from "./Components/HomePage/Home";
import AdminHome from "./Components/HomePage/AdminHome";
import Login from "./Components/Login/Login";
import AntHome from "./Components/HomePage/AntHome";
import LoginFormik from "./Components/Login/LoginFormik";
import ShowOrders from "./Components/MyOrders/ShowOrders";
import MyCart from "./Components/Cart/MyCart";
import OrderDetails from "./Components/MyOrders/OrderDetails";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Router>
            <Routes>
              <Route element={<Landing />} path="/" exact />
              <Route element={<LoginFormik />} path="/login" />

              <Route element={<ProtectedRoute />}>
                <Route element={<Home />} path="/home" />
                <Route element={<AntHome />} path="/anthome" />
                <Route element={<AdminHome />} path="/adminhome" />
                <Route element={<ShowOrders />} path="/showorders" />
                <Route
                  element={<OrderDetails />}
                  path="/orderdetails/:orderId"
                />
                <Route element={<MyCart />} path="/mycart" />
              </Route>
            </Routes>
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
