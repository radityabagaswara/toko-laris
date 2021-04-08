import { Component } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Search from "../../components/shareable/search/Search";
import "./ProductDetails.scss";
import { FaCartPlus } from "react-icons/fa";
import { AiFillHeart, AiOutlineShareAlt, AiOutlineHeart } from "react-icons/ai";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { qty: 1 };
  }

  qtyPlus = () => {
    this.setState({ qty: this.state.qty + 1 });
  };

  qtyMin = () => {
    if (this.state.qty > 1) {
      this.setState({ qty: this.state.qty - 1 });
    }
  };

  render() {
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
                  <a href="#">*category name</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  *product name
                </li>
              </ol>
            </nav>

            <div className="product-detail__desc row justify-content-center mt-3">
              <div className="col-md-5">
                <div className="product-detail__image mx-auto">
                  <img
                    className=""
                    src="https://themehunk.com/wp-themes/almaira-shop-dark-scheme/wp-content/uploads/sites/89/2019/01/logo-11.jpg"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h4 className="text-primary fw-bold">Nama Produk</h4>
                <h6>Rp 120.000</h6>
                <div className="">
                  <hr />
                  <ul>
                    <li>
                      <strong>Berat</strong> 600gr
                    </li>
                    <li>
                      <strong>Kategori</strong> *kategori
                    </li>
                    <li>
                      <strong>Brand</strong> *brand
                    </li>
                    <li>
                      <strong>Stok</strong> {"<"}10
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
                  <button className="btn btn-primary d-flex align-items-center ms-3">
                    <FaCartPlus /> <span className="ms-2">Add to Cart</span>
                  </button>
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
                  Officia nostrud reprehenderit ut non ipsum fugiat. Et
                  reprehenderit cillum et voluptate ullamco fugiat. Incididunt
                  occaecat magna fugiat magna esse velit ex. Non ipsum magna
                  nostrud quis consectetur labore. Et est anim commodo
                  reprehenderit qui ut nisi enim. Mollit quis incididunt duis
                  eiusmod ex. Minim velit sunt amet sint commodo enim eu duis
                  qui laborum anim. Laborum dolore officia aute elit
                  consectetur. Sunt adipisicing non nostrud dolor ex et do
                  proident cillum Lorem minim reprehenderit commodo cupidatat.
                  Mollit consequat sint non ea reprehenderit ullamco amet ut
                  velit esse aliquip duis irure.
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
