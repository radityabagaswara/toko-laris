exports.addCart = (item) => {
  if (localStorage.getItem("cart")) {
    let d = JSON.parse(localStorage.getItem("cart"));
    d.push(item);
    localStorage.setItem("cart", JSON.stringify(d));
  } else {
    let d = [];
    d.push(item);
    localStorage.setItem("cart", JSON.stringify(d));
  }
};

exports.getCart = () => {
  if (localStorage.getItem("cart") != null) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return null;
  }
};

exports.deleteCartItem = (id) => {
  if (localStorage.getItem("cart")) {
    let d = JSON.parse(localStorage.getItem("cart"));
    d = d.filter((e) => e.produk_id != id);
    console.log(d);
    localStorage.setItem("cart", JSON.stringify(d));
  }
};

exports.deleteAllCart = () => {
  localStorage.removeItem("cart");
};

exports.isItemInCart = (id) => {
  if (localStorage.getItem("cart")) {
    let d = JSON.parse(localStorage.getItem("cart"));
    if (d.some((e) => e.produk_id == id)) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};
