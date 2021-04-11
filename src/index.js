import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Homepage from "./page/Homepage/Homepage";
import Products from "./page/products/Products";
import ProductDetails from "./page/product-details/ProductDetails";
import Login from "./page/Login/Login";
import Register from "./page/register/Register";
import Logout from "./page/Logout";
import AdminHomepage from "./page/Admin/Homepage/AdminHomepage";
import Checkout from "./page/checkout/Checkout";
import AddProduct from "./page/Admin/AddProduct/AddProduct";
import CheckoutHistory from "./page/checkout/History";
import HistoryItem from "./page/checkout/HistoryItem";
ReactDOM.render(
  <React.StrictMode>
    <App />
    <Router>
      <Switch>
        <Route path="/catalog">
          <Products />
        </Route>
        <Route path="/product/:id" component={ProductDetails} />

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/logout">
          <Logout />
        </Route>

        <Route path="/admin/products/add" component={AddProduct} />
        <Route path="/admin" component={AdminHomepage} />
        <Route path="/checkout/history/items/:id" component={HistoryItem} />
        <Route path="/checkout/history" component={CheckoutHistory} />

        <Route path="/checkout" component={Checkout} />

        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
