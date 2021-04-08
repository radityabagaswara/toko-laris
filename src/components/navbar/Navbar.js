import "./Navbar.scss";
import { IoHeartOutline } from "react-icons/io5";
import CartIcon from "../shareable/cart-icon/CartIcon";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataKey } from "../../utils/Key";

const Navbar = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (getDataKey) {
      setData(getDataKey);
    }
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
          <div
            className="hover"
            data-bs-toggle="popover"
            data-bs-trigger="hover focus"
            data-bs-content="Cart!"
            data-bs-placement="bottom"
          >
            <CartIcon size="30px" />
          </div>
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
                    <a class="dropdown-item" href="#">
                      Account
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Order Status
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Logout
                    </a>
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
