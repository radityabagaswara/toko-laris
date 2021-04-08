import { useEffect, useState } from "react";
import "./Search.scss";
const Search = (props) => {
  const [sort, setSort] = useState([]);
  const [sortItem, setSortItem] = useState([
    { value: "Popular", text: "🔥 Popular" },
    { value: "Newest", text: "👶 Newest" },
    { value: "Lowest Price", text: "💩 Lowest Price" },
    { value: "Highest Price", text: "👑 Highest Price" },
  ]);

  useEffect(() => {
    setSort(sortItem[0]);
  }, []);

  const renderListSort = () => {
    let item = [];

    sortItem.forEach((element) => {
      item.push(
        <li onClick={() => setSort(element)}>
          <a className="dropdown-item" href="#">
            {element.text}
          </a>
        </li>
      );
    });

    return item;
  };
  return (
    <div className="form__search">
      <form className="search row align-items-center">
        <div className="col-md-9">
          <input
            className="form-control"
            type="text"
            placeholder="Cari produk..."
          />
        </div>
        <div className="col-md-2">
          <a
            className="btn btn-secondary dropdown-toggle"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {sort.text}
          </a>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            {renderListSort()}
          </ul>
        </div>
        <div className="col-md-1">
          <button className="btn btn-primary btn-search">Search</button>
        </div>
      </form>
    </div>
  );
};

export default Search;
