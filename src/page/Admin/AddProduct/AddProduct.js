import React from "react";
import Swal from "sweetalert2";
import { checkadmin, checkLogin } from "../../../utils/CheckLogin";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/navbar/Navbar";
import API from "../../../utils/API";
import "./AddProduct.scss";
class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imageDisplay: null,
      nama_produk: null,
      deskripsi_produk: null,
      harga_produk: null,
      stock_produk: null,
      brand_produk: null,
      berat_produk: null,
      kategori_produk: null,
      kategori: null,
    };
  }

  async componentDidMount() {
    const checkedLogin = await checkLogin();
    const checkAdmin = await checkadmin();

    if (!checkedLogin || !checkAdmin) return (window.location.href = "/");
    API.get("/kategori").then((res) => {
      console.log(res);
      if (res.status == 200) {
        this.setState({ kategori: res.data });
      }
    });
  }

  renderCategory() {
    let cat = [];
    this.state.kategori.forEach((e) => {
      cat.push(<option value={e.id}>{e.name}</option>);
    });

    return cat;
  }

  submitProduct = () => {
    if (
      !this.state.image ||
      !this.state.nama_produk ||
      !this.state.deskripsi_produk ||
      !this.state.harga_produk ||
      !this.state.stock_produk ||
      !this.state.brand_produk ||
      !this.state.berat_produk ||
      !this.state.kategori_produk ||
      this.state.kategori_produk == -1
    ) {
      return Swal.fire({
        icon: "error",
        title: "Whoops",
        text: "Please input all fields!",
      });
    }
    const data = new FormData();
    data.append("file", this.state.image);
    API.post("/addImageProduct", data)
      .then((res) => {
        if (res.status == 200) {
          const dataProduk = {
            nama_produk: this.state.nama_produk,
            deskripsi_produk: this.state.deskripsi_produk,
            image_produk: res.data,
            price_produk: this.state.harga_produk,
            stock_produk: this.state.stock_produk,
            brand_produk: this.state.brand_produk,
            berat_produk: this.state.berat_produk,
            kategori_produk: this.state.kategori_produk,
          };
          API.post("/addProduct", dataProduk)
            .then((res2) => {
              if (res2.status == 200) {
                Swal.fire({
                  icon: "success",
                  title: "Success!",
                  text: "Produk berhasil dimasukan!",
                });
              }
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Whoops",
                text: "Please try again later!",
              });
            });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Whoops",
          text: "Please try again later!",
        });
      });
  };

  render() {
    return (
      <>
        <Navbar />
        <div className="addproduct container">
          <form
            className="addproduct__form"
            onSubmit={(e) => {
              e.preventDefault();
              this.submitProduct();
            }}
          >
            <div className="row">
              <div className="col-md-3">
                <img
                  src={`${
                    this.state.imageDisplay != null
                      ? this.state.imageDisplay
                      : "https://via.placeholder.com/300"
                  }`}
                  className="img-fluid"
                />
                <div class="my-3">
                  <label for="formFile" class="form-label">
                    Foto Produk
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    onChange={(e) =>
                      this.setState({
                        image: e.target.files[0],
                        imageDisplay: URL.createObjectURL(e.target.files[0]),
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-md-9">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) =>
                      this.setState({ nama_produk: e.target.value })
                    }
                  />
                  <label for="floatingInput">Nama Produk</label>
                </div>
                <div class="form-floating">
                  <textarea
                    type="text"
                    class="form-control mb-3"
                    id="floatingPassword"
                    placeholder="description"
                    style={{ height: "200px" }}
                    onChange={(e) =>
                      this.setState({ deskripsi_produk: e.target.value })
                    }
                  />
                  <label for="floatingPassword">Deskripsi Produk</label>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div class="input-group mb-3">
                      <span class="input-group-text">Rp.</span>
                      <input
                        type="number"
                        class="form-control"
                        placeholder="Harga per pcs"
                        max={100000000}
                        min={10000}
                        onChange={(e) =>
                          this.setState({ harga_produk: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div class="form-floating mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        onChange={(e) =>
                          this.setState({ stock_produk: e.target.value })
                        }
                      />
                      <label for="floatingInput">Stock</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div class="form-floating mb-3">
                      <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        onChange={(e) =>
                          this.setState({ brand_produk: e.target.value })
                        }
                      />
                      <label for="floatingInput">Brand</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div class="form-floating mb-3">
                      <input
                        type="number"
                        step={0.1}
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        onChange={(e) =>
                          this.setState({ berat_produk: e.target.value })
                        }
                      />
                      <label for="floatingInput">Weight (gram)</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div class="form-floating mb-3">
                      <select
                        class="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        onChange={(e) =>
                          this.setState({ kategori_produk: e.target.value })
                        }
                      >
                        <option selected value="-1">
                          Category
                        </option>
                        {this.state.kategori ? this.renderCategory() : ""}
                      </select>
                      <label for="floatingSelect">Works with selects</label>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" type="submit">
                  Tambah Produk
                </button>
              </div>
            </div>
          </form>
        </div>
        <Footer />
      </>
    );
  }
}

export default AddProduct;
