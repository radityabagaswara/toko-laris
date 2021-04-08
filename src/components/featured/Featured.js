import React from "react";
import CatalogItem from "../shareable/catalog-item/CatalogItem";
import "./Featured.scss";

const Featured = (props) => {
  return (
    <div className="featured">
      <div className="featured__content">
        <div className="featured__header text-center">
          <h3 className="text-primary">Featured Items</h3>
          <p>Barang-barang yang cocok untuk kamu!</p>
        </div>
        <div className="featured__items row justify-content-center align-items-center">
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
    </div>
  );
};

export default Featured;
