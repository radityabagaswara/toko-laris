import CatalogItem from "../shareable/catalog-item/CatalogItem";
import "./Catalog.scss";

const Catalog = ({ data }) => {
  const renderItem = () => {
    let item = [];
    data.forEach((e) => {
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
      <div className="catalog__item__wrapper row">{renderItem()}</div>
    </div>
  );
};

export default Catalog;
