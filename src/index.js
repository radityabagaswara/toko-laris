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
ReactDOM.render(
  <React.StrictMode>
    <App />
    <Router>
      <Switch>
        <Route path="/catalog">
          <Products />
        </Route>
        <Route path="/product/:id">
          <ProductDetails />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
