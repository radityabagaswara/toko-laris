import "./Navbar.scss";
import { IoHeartOutline } from "react-icons/io5";
import CartIcon from "../shareable/cart-icon/CartIcon";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataKey } from "../../utils/Key";
import { getCart } from "../../utils/Cart";

const Navbar = (props) => {
  const [data, setData] = useState(null);
  const [cart, setCart] = useState(0);

  useEffect(() => {
    if (getDataKey) {
      setData(getDataKey);
    }
    if (getCart()) {
      setCart(getCart().length);
    }
    setInterval(() => {
      if (getDataKey) {
        setData(getDataKey);
      }
      if (getCart()) {
        setCart(getCart().length);
      }
    }, 1000);
  }, []);

  return (
    <div className="navbar fixed-top">
      <div className="navbar__inner container">
        <div className="navbar__logo">
          <Link to="/">
            <h4 className="text-primary fw-bold">TokoLaris.id</h4>
          </Link>
        </div>
        <div className="navbar__content">
          <div
            className="hover"
            data-bs-toggle="popover"
            data-bs-trigger="hover focus"
            data-bs-content="Favorite!"
            data-bs-placement="bottom"
          >
            <IoHeartOutline size="30px" />
          </div>
          <Link to="/checkout">
            <div
              className="hover"
              data-bs-toggle="popover"
              data-bs-trigger="hover focus"
              data-bs-content="Cart!"
              data-bs-placement="bottom"
            >
              <CartIcon size="30px" items={cart} />
            </div>
          </Link>
          <div className="ms-4">
            {data == null ? (
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            ) : (
              <>
                <a
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="dropdownuser"
                >
                  {data["name"]}
                </a>
                <ul
                  class="dropdown-menu"
                  style={{ left: "unset" }}
                  aria-labelledby="dropdownuser"
                >
                  <li>
                    <Link class="dropdown-item" to="#">
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/checkout/history">
                      Order Status
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/logout">
                      Logout
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
