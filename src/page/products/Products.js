import { Component } from "react";
import Categories from "../../components/categories/Categories";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import CatalogItem from "../../components/shareable/catalog-item/CatalogItem";
import Search from "../../components/shareable/search/Search";
import "./Products.scss";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: {},
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
          <Categories />
          <div className="row mt-5">
            <div className="col-md-3">
              <CatalogItem
                image="https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/2/22/4ea07e3f-369a-4441-91d2-6a5adb824158.jpg.webp?ect=4g"
                title="STUDIO TROPIK DreamSetter"
                price={59000}
                reviews={300}
              />
            </div>
            <div className="col-md-3">
              <CatalogItem
                image="https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/2/22/4ea07e3f-369a-4441-91d2-6a5adb824158.jpg.webp?ect=4g"
                title="STUDIO TROPIK DreamSetter"
                price={59000}
                reviews={300}
              />
            </div>
            <div className="col-md-3">
              <CatalogItem
                image="https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/2/22/4ea07e3f-369a-4441-91d2-6a5adb824158.jpg.webp?ect=4g"
                title="STUDIO TROPIK DreamSetter"
                price={59000}
                reviews={300}
              />
            </div>
            <div className="col-md-3">
              <CatalogItem
                image="https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/2/22/4ea07e3f-369a-4441-91d2-6a5adb824158.jpg.webp?ect=4g"
                title="STUDIO TROPIK DreamSetter"
                price={59000}
                reviews={300}
              />
            </div>
            <div className="col-md-3">
              <CatalogItem
                image="https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/2/22/4ea07e3f-369a-4441-91d2-6a5adb824158.jpg.webp?ect=4g"
                title="STUDIO TROPIK DreamSetter"
                price={59000}
                reviews={300}
              />
            </div>
            <div className="col-md-3">
              <CatalogItem
                image="https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/2/22/4ea07e3f-369a-4441-91d2-6a5adb824158.jpg.webp?ect=4g"
                title="STUDIO TROPIK DreamSetter"
                price={59000}
                reviews={300}
              />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Products;
