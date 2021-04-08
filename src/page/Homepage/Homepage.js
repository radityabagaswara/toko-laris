import React from "react";
import { Link } from "react-router-dom";
import Catalog from "../../components/catalog/Catalog";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import Header1 from "../../components/Header/Header1";
import Navbar from "../../components/navbar/Navbar";
import "./Homepage.scss";

class Homepage extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
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
          <Catalog />

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
