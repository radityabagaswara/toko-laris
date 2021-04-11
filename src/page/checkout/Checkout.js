import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import API from "../../utils/API";
import { deleteAllCart, getCart } from "../../utils/Cart";
import { checkLogin } from "../../utils/CheckLogin";
import { getDataKey } from "../../utils/Key";
import "./Checkout.scss";
import Crypto from "crypto-js";
class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], user: null, userDetails: [], credit: null };
  }

  async componentDidMount() {
    const checkedLogin = await checkLogin();
    if (!checkedLogin) return (window.location.href = "/login");
    this.setState({ user: getDataKey() });
    this.getData();

    API.get("/getSelfCheckout").then((res) => {
      if (res.status == 200) {
        this.setState({ userDetails: res.data });
      }
    });
  }

  getData = () => {
    const cart = getCart();
    if (!cart) return;
    cart.forEach((element) => {
      API.get("/produkById?id=" + element.produk_id).then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          const dataConstruct = {
            id: res.data.produk_id,
            name: res.data.produk_nama,
            desc: res.data.description.substring(0, 50) + "...",
            price: res.data.price,
            qty: element.qty,
          };
          this.setState({ data: [...this.state.data, dataConstruct] });
        }
      });
    });
  };

  renderCartItem = () => {
    let item = [];
    this.state.data.forEach((e) => {
      item.push(
        <>
          <div className="cart__summary__item">
            <div className="cart__summary__item__detail row">
              <div className="col-md-8">
                <Link to={`/product/${e.name.replaceAll(" ", "-")}`}>
                  <h6 className="fw-bold text-primary">
                    {e.qty}x {e.name}
                  </h6>
                </Link>
                <p>{e.desc}</p>
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

  processCheckout = () => {
    if (this.state.credit == null || this.state.credit.length < 10)
      return Swal.fire({
        icon: "error",
        title: "Oopps!",
        text: "Credit card can't is not valid",
      });
    const content = {
      produk: this.state.data,
      credit: Crypto.AES.encrypt(
        this.state.credit,
        "7zEp$Cj3o4K556Rm"
      ).toString(),
    };
    console.log(content);
    API.post("/checkout", content).then((res) => {
      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Pesanan berhasil diproses.",
        }).then(() => {
          window.location.href = "/";
        });
        deleteAllCart();
      }
    });
  };

  render() {
    return (
      <>
        <Navbar />
        <div className="checkout container">
          <div className="checkout__header ">
            <h5 className="fw-bold text-primary">
              Ready to checkout{" "}
              {this.state.user != null
                ? this.state.user.name.split(" ")[0]
                : ""}
              ?
            </h5>
          </div>
          {this.state.data.length < 1 ? (
            <>
              <h5 className="text-black fw-bold mt-5">Keranjang kosong!</h5>
              <Link to="/catalog">Tambahkan produk terlebih dahulu</Link>
            </>
          ) : (
            <div className="row">
              <div className="col-md-7 mt-5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.processCheckout();
                  }}
                >
                  <h6 className="text-primary">Billing & Shipping details</h6>
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floating"
                      value={this.state.userDetails.name}
                      disabled
                    />
                    <label for="floating">Full Name</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floating"
                      value={this.state.userDetails.phone_number}
                      disabled
                    />
                    <label for="floating">Phone Number</label>
                  </div>

                  <div class="form-floating mb-5">
                    <textarea
                      type="text"
                      class="form-control"
                      id="floating"
                      value={this.state.userDetails.address}
                      style={{ height: "100px" }}
                      disabled
                    />
                    <label for="floating">Address</label>
                  </div>

                  <div class="form-floating mb-3">
                    <input
                      type="tel"
                      inputmode="numeric"
                      pattern="[0-9\s]{13,19}"
                      autocomplete="cc-number"
                      maxlength="19"
                      placeholder="xxxx xxxx xxxx xxxx"
                      class="form-control"
                      id="floating"
                      onChange={(e) =>
                        this.setState({ credit: e.target.value })
                      }
                    />
                    <label for="floating">Card Number</label>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          inputmode="numeric"
                          pattern="[0-9\s]{13,19}"
                          maxlength="19"
                          placeholder=""
                          class="form-control"
                          id="floating"
                        />
                        <label for="floating">Card Number</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          inputmode="numeric"
                          pattern="[0-9\s]{13,19}"
                          maxlength="19"
                          placeholder=""
                          class="form-control"
                          id="floating"
                        />
                        <label for="floating">Expiration Date</label>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Check Out
                  </button>
                </form>
              </div>

              <div className="col-md-5">
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
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default Checkout;
