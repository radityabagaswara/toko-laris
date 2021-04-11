import { Component } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Search from "../../components/shareable/search/Search";
import "./ProductDetails.scss";
import { FaCartPlus } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import { AiFillHeart, AiOutlineShareAlt, AiOutlineHeart } from "react-icons/ai";
import {
  isItemInCart,
  deleteCartItem,
  addCart,
  getCart,
} from "../../utils/Cart";
import API from "../../utils/API";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null, qty: 1, isInCart: false };
  }

  componentDidMount() {
    const data = { title: this.props.match.params.id.replaceAll("-", " ") };
    API.post("/produkInfo", data).then((res) => {
      if (res.status == 200) {
        this.setState({ data: res.data });
        if (isItemInCart(res.data.produk_id)) {
          this.setState({ isInCart: true });
          let dataCart = getCart();
          dataCart.filter((x) => {
            if (x.produk_id == res.data.produk_id) {
              this.setState({ qty: x.qty });
            }
          });
        }
      }
    });
  }

  addToCart = () => {
    if (this.state.isInCart) {
      deleteCartItem(this.state.data.produk_id);
    }
    addCart({ produk_id: this.state.data.produk_id, qty: this.state.qty });
    this.setState({ isInCart: true });
  };

  removeFromCart = () => {
    if (this.state.isInCart) {
      deleteCartItem(this.state.data.produk_id);
      this.setState({ isInCart: false });
    }
  };

  qtyPlus = () => {
    if (this.state.qty + 1 > this.state.data.qty) return;
    this.setState({ qty: this.state.qty + 1 });
  };

  qtyMin = () => {
    if (this.state.qty > 1) {
      this.setState({ qty: this.state.qty - 1 });
    }
  };

  render() {
    if (this.state.data == null) return <></>;
    return (
      <>
        <Navbar />
        <div className="product-detail">
          <div className="search__wrapper">
            <div className="container">
              <Search />
            </div>
          </div>

          <div className="container mt-3">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="/catalog">Catalog</a>
                </li>
                <li class="breadcrumb-item">
                  <a href="#">{this.state.data.category}</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  {this.state.data.produk_nama}
                </li>
              </ol>
            </nav>

            <div className="product-detail__desc row justify-content-center mt-3">
              <div className="col-md-5">
                <div className="product-detail__image mx-auto">
                  <img
                    className=""
                    src={`http://localhost:4320/product-images/${this.state.data.image}`}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h4 className="text-primary fw-bold">
                  {this.state.data.produk_nama}
                </h4>
                <h6>Rp. {this.state.data.price.toLocaleString()}</h6>
                <div className="">
                  <hr />
                  <ul>
                    <li>
                      <strong>Berat</strong> {this.state.data.weight}gr
                    </li>
                    <li>
                      <strong>Kategori</strong> {this.state.data.category}
                    </li>
                    <li>
                      <strong>Brand</strong> {this.state.data.brand}
                    </li>
                    <li>
                      <strong>Stok</strong> {"< "}
                      {this.state.data.qty}
                    </li>
                  </ul>
                </div>
                <hr />

                <div className="product-detail__qty d-flex flex-rows no-wrap align-items-center">
                  <button
                    className="btn btn-secondary btn-minus"
                    onClick={(e) => {
                      e.target.blur();
                      this.qtyMin();
                    }}
                  >
                    -
                  </button>
                  <div className="btn product-detail__qty__counter">
                    {this.state.qty}
                  </div>
                  <button
                    className="btn btn-secondary btn-plus"
                    onClick={(e) => {
                      e.target.blur();
                      this.qtyPlus();
                    }}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-primary d-flex align-items-center ms-3"
                    onClick={this.addToCart}
                  >
                    <FaCartPlus />{" "}
                    <span className="ms-2">
                      {!this.state.isInCart ? "Add to Cart" : "Update Cart"}
                    </span>
                  </button>

                  {this.state.isInCart ? (
                    <button
                      className="btn btn-danger d-flex align-items-center ms-3"
                      onClick={this.removeFromCart}
                    >
                      <MdRemoveShoppingCart />{" "}
                      <span className="ms-2">Remove Cart</span>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="mt-3 d-flex flex-rows flex-wrap">
                  <div
                    className="btn-action ms-2"
                    data-bs-toggle="popover"
                    data-bs-trigger="hover focus"
                    data-bs-content="Add to Favorite!"
                    data-bs-placement="bottom"
                  >
                    <AiOutlineHeart size="1.8rem" />
                  </div>
                  <div
                    className="btn-action ms-2"
                    data-bs-toggle="popover"
                    data-bs-trigger="hover focus"
                    data-bs-content="Share Product!"
                    data-bs-placement="bottom"
                  >
                    <AiOutlineShareAlt size="1.8rem" />
                  </div>
                </div>
              </div>
            </div>
            <nav className="mt-5">
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button
                  class="nav-link active"
                  id="nav-description-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-description"
                  type="button"
                  role="tab"
                  aria-controls="nav-description"
                  aria-selected="true"
                >
                  Description
                </button>
                <button
                  class="nav-link"
                  id="nav-reviews-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-reviews"
                  type="button"
                  role="tab"
                  aria-controls="nav-reviews"
                  aria-selected="false"
                >
                  Reviews
                </button>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div
                class="tab-pane fade show active"
                id="nav-description"
                role="tabpanel"
                aria-labelledby="nav-description-tab"
              >
                <div class="mt-3 product-detail__description">
                  {this.state.data.description}
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="nav-reviews"
                role="tabpanel"
                aria-labelledby="nav-reviews-tab"
              >
                ...
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default ProductDetails;
