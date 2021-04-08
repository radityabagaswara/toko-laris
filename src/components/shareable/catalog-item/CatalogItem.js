import React from "react";
import "./CatalogItem.scss";
import { IoStar, IoStarOutline, IoStarHalf } from "react-icons/io5";

const CatalogItem = ({ title, image, price, rating = 3, reviews }) => {
  const renderStar = () => {
    const star = [];
    for (let i = 1; i <= 5; i++) {
      if (rating > 0 && rating != null && i <= rating) {
        //Check if there's decimal and it's the last number
        if (rating % 1 != 0 && i == Math.floor(rating)) {
          star.push(<IoStar />);
          star.push(<IoStarHalf />);
          i++;
        } else star.push(<IoStar />);
      } else {
        star.push(<IoStarOutline />);
      }
    }
    return star;
  };

  return (
    <div className="catalog__item shadow">
      <img src={image} />
      <div className="catalog__item__content">
        <h6 className="text-primary fw-bold">{title}</h6>
        <p className="fw-bold">Rp {price.toLocaleString()}</p>
        <div className="text-primary">
          {renderStar()}
          <span className="ms-1">
            <small>({reviews})</small>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;
