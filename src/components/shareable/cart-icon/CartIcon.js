import "./CartIcon.scss";
import { IoCartOutline } from "react-icons/io5";
const CartIcon = ({ items = 0, size = 7 }) => {
  return (
    <div className="carticon">
      <IoCartOutline size={size} />
      {/* Hide if items is zero */}
      <div className={`carticon__number ${items < 1 ? "hidden" : ""}`}>
        <small>{items}</small>
      </div>
    </div>
  );
};

export default CartIcon;
