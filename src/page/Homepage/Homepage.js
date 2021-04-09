import React from "react";
import { Link } from "react-router-dom";
import Catalog from "../../components/catalog/Catalog";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import Header1 from "../../components/Header/Header1";
import Navbar from "../../components/navbar/Navbar";
import API from "../../utils/API";
import "./Homepage.scss";

class Homepage extends React.Component {
  constructor(props) {
    super();
    this.state = { produk: null };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    API.get("/produk?limit=20").then((res) => {
      if (res.status == 200) {
        this.setState({ produk: res.data });
      }
    });
  };

  render() {
    return (
      <div className="homepage">
        <Navbar />
        <div className="header__wrapper">
          <Header1 className=" container mt-5 mb-5" />
        </div>

        <div className="container position-relative featured__homepage">
          <Featured />
        </div>

        <div className="container">
          {this.state.produk ? <Catalog data={this.state.produk} /> : ""}

          <div className="text-center">
            <Link to="/catalog" className="btn btn-secondary mb-4">
              Show More
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Homepage;
