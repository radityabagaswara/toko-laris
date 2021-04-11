import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import "./AdminHomepage.scss";
import { getDataKey } from "../../../utils/Key";
import MaterialTable from "material-table";
import API from "../../../utils/API";
import { checkadmin, checkLogin } from "../../../utils/CheckLogin";
import { Link } from "react-router-dom";
class AdminHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, data: null };
  }

  async componentDidMount() {
    const checkedLogin = await checkLogin();
    const checkAdmin = await checkadmin();

    if (!checkedLogin || !checkAdmin) return (window.location.href = "/");

    if (getDataKey()) {
      this.setState({ user: getDataKey() });
    }
    API.get("/produk").then((res) => {
      if (res.status == 200) this.setState({ data: res.data });
    });
  }

  render() {
    return (
      <>
        <Navbar />
        <div className="admin-homepage container">
          <div className="admin-homepage__header">
            <h5 className="text-primary">
              Selamat datang,{" "}
              {this.state.user != null ? this.state.user["name"] : "null"}
            </h5>
            <p>Apa yang ingin kamu lakukan?</p>
          </div>
          <div className="text-end mb-3">
            <Link className="btn btn-primary" to="/admin/products/add">
              Tambah Produk
            </Link>
          </div>
          {this.state.data != null ? (
            <MaterialTable
              title="Products List"
              columns={[
                {
                  title: "Image",
                  field: "image",
                  render: (rowData) => (
                    <img
                      src={`http://localhost:4320/product-images/${rowData.image}`}
                      className="img-fluid"
                      style={{ width: "150px" }}
                    />
                  ),
                },
                { title: "Nama Produk", field: "name" },
                { title: "Stock", field: "qty" },
                { title: "Weight", field: "weight" },
                { title: "Price", field: "price" },
              ]}
              data={this.state.data}
            />
          ) : (
            ""
          )}
        </div>

        <Footer />
      </>
    );
  }
}
export default AdminHomepage;
