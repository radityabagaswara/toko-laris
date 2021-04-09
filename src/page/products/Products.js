import { Component } from "react";
import Categories from "../../components/categories/Categories";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import CatalogItem from "../../components/shareable/catalog-item/CatalogItem";
import Search from "../../components/shareable/search/Search";
import API from "../../utils/API";
import "./Products.scss";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {},
      produk: null,
      kategori: null,
      sortItem: [
        { value: "Popular", text: "🔥 Popular" },
        { value: "Newest", text: "👶 Newest" },
        { value: "Lowest Price", text: "💩 Lowest Price" },
        { value: "Highest Price", text: "👑 Highest Price" },
      ],
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.setState({ sort: this.state.sortItem[0] });
    API.get("/produk").then((res) => {
      if (res.status == 200) {
        this.setState({ produk: res.data });
      }
    });

    API.get("/kategori").then((res) => {
      if (res.status == 200) {
        this.setState({ kategori: res.data });
      }
    });
  };

  renderProduct = () => {
    let item = [];
    this.state.produk.forEach((e) => {
      item.push(
        <div className="col-md-2">
          <CatalogItem
            image={`http://localhost:4320/product-images/${e.image}`}
            title={e.name}
            price={e.price}
            reviews={300}
          />
        </div>
      );
    });
    return item;
  };

  renderKategori = () => {
    let item = [];
    this.state.kategori.forEach((e) => {
      item.push(
        <div className="col-md-2 categories__item">
          <h5>{e.name}</h5>
        </div>
      );
    });
    return item;
  };
  render() {
    return (
      <>
        <Navbar />
        <div className="catalog-page container">
          <div className="catalog-page__header text-center">
            <h3 className="text-primary fw-bold">Latest Products</h3>
            <p>lorem ipsum dolor sit</p>
          </div>
          <Search />
          <h4 className="text-blue mt-5">Categories</h4>
          <div className="categories">
            <div className="row align-items-center">
              {this.state.kategori != null ? this.renderKategori() : ""}
            </div>
          </div>
          <div className="row mt-5">
            {this.state.produk != null ? this.renderProduct() : ""}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Products;
