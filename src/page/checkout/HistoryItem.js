import MaterialTable from "material-table";
import React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import API from "../../utils/API";
import { checkLogin } from "../../utils/CheckLogin";

class HistoryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], redirectUrl: "" };
  }

  async componentDidMount() {
    const checkedLogin = await checkLogin();
    if (!checkedLogin) return (window.location.href = "/login");
    API.get("/checkouthistoryitem?id=" + this.props.match.params.id).then(
      (res) => {
        this.setState({ data: res.data });
      }
    );
  }
  renderCartItem = () => {
    let item = [];
    this.state.data.forEach((e) => {
      item.push(
        <>
          <div className="cart__summary__item">
            <div className="cart__summary__item__detail row align-items-center">
              <div className="col-md-2">
                <img
                  className="img-fluid"
                  src={`http://localhost:4320/product-images/${e.image}`}
                />
              </div>
              <div className="col-md-6">
                <Link to={`/product/${e.product.replaceAll(" ", "-")}`}>
                  <h6 className="fw-bold text-primary">
                    {e.qty}x {e.product}
                  </h6>
                </Link>
                <p>{e.description.substring(0, 250) + "..."}</p>
              </div>
              <div className="col-md-4 text-end">
                <p>Rp {(e.price * e.qty).toLocaleString()}</p>
              </div>
            </div>
          </div>
          <hr />
        </>
      );
    });
    return item;
  };

  getTotal = () => {
    let total = 0;
    this.state.data.forEach((e) => (total += e.price * e.qty));
    return total;
  };
  render() {
    if (this.state.redirectUrl.length > 0) {
      return (
        <>
          <Redirect to={this.state.redirectUrl} />
        </>
      );
    }
    return (
      <>
        <Navbar />
        <div className="checkout container">
          <Link className="btn btn-secondary mb-3" to="/checkout/history">
            Back
          </Link>
          <h5 className="text-primary fw-bold mb-5">Checkout History</h5>
          <div className="row">
            <div className="col-md-12">
              <div className="cart__summary">
                <h5>Cart Summary</h5>
                <div className="cart__summary__item__wrapper my-4">
                  {this.renderCartItem()}
                </div>
                <h5>
                  Total:{" "}
                  <span className="text-primary fw-bold ">
                    Rp {this.getTotal().toLocaleString()}
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
export default HistoryItem;
