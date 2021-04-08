import CatalogItem from "../shareable/catalog-item/CatalogItem";
import "./Catalog.scss";

const Catalog = (props) => {
  return (
    <div className="catalog">
      <div className="catalog__header text-center">
        <h3 className="text-primary">For First Name</h3>
        <p>Produk yang mungkin kamu sukai!</p>
      </div>
      <div className="catalog__category d-flex justify-content-end">
        <form className="w-25">
          <select className="form-select form-control">
            <option>Alat Elektronik</option>
            <option>Alat Olahraga</option>
            <option>Perabotan Rumah Tangga</option>
          </select>
        </form>
      </div>
      <div className="catalog__item__wrapper row">
        <div className="col-md-2">
          <CatalogItem
            image="https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/2/22/4ea07e3f-369a-4441-91d2-6a5adb824158.jpg.webp?ect=4g"
            title="STUDIO TROPIK DreamSetter"
            price={59000}
            reviews={300}
          />
        </div>

        <div className="col-md-2">
          <CatalogItem
            image="https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/2/22/4ea07e3f-369a-4441-91d2-6a5adb824158.jpg.webp?ect=4g"
            title="STUDIO TROPIK DreamSetter"
            price={59000}
            reviews={300}
          />
        </div>
        <div className="col-md-2">
          <CatalogItem
            image="https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/2/22/4ea07e3f-369a-4441-91d2-6a5adb824158.jpg.webp?ect=4g"
            title="STUDIO TROPIK DreamSetter"
            price={59000}
            reviews={300}
          />
        </div>
        <div className="col-md-2">
          <CatalogItem
            image="https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/2/22/4ea07e3f-369a-4441-91d2-6a5adb824158.jpg.webp?ect=4g"
            title="STUDIO TROPIK DreamSetter"
            price={59000}
            reviews={300}
          />
        </div>
        <div className="col-md-2">
          <CatalogItem
            image="https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/2/22/4ea07e3f-369a-4441-91d2-6a5adb824158.jpg.webp?ect=4g"
            title="STUDIO TROPIK DreamSetter"
            price={59000}
            reviews={300}
          />
        </div>
        <div className="col-md-2">
          <CatalogItem
            image="https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/2/22/4ea07e3f-369a-4441-91d2-6a5adb824158.jpg.webp?ect=4g"
            title="STUDIO TROPIK DreamSetter"
            price={59000}
            reviews={300}
          />
        </div>
        <div className="col-md-2">
          <CatalogItem
            image="https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/2/22/4ea07e3f-369a-4441-91d2-6a5adb824158.jpg.webp?ect=4g"
            title="STUDIO TROPIK DreamSetter"
            price={59000}
            reviews={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
