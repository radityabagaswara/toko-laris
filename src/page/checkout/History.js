import MaterialTable from "material-table";
import React from "react";
import { Redirect } from "react-router";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import API from "../../utils/API";
import { checkLogin } from "../../utils/CheckLogin";

class CheckoutHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], redirectUrl: "" };
  }

  async componentDidMount() {
    const checkedLogin = await checkLogin();
    if (!checkedLogin) return (window.location.href = "/login");
    API.get("/checkoutHistory").then((res) => {
      this.setState({ data: res.data });
    });
  }
  render() {
    if (this.state.redirectUrl.length > 0) {
      return (
        <>
          <Redirect to={this.state.redirectUrl} />
        </>
      );
    }
    return (
      <>
        <Navbar />
        <div className="checkout container">
          <h5 className="text-primary fw-bold mb-5">Checkout History</h5>

          <MaterialTable
            title="History"
            onRowClick={(e, rowData) => {
              this.setState({
                redirectUrl: "/checkout/history/items/" + rowData["id"],
              });
            }}
            columns={[
              { name: "Date", field: "date", title: "Date" },
              { name: "Items", title: "Total Items", field: "item_count" },
              { name: "Shipping", field: "shipping", title: "Shipping" },
              {
                payment_method: "Payment Method",
                field: "payment_method",
                title: "Payment Method",
              },
            ]}
            data={this.state.data}
          />
        </div>
        <Footer />
      </>
    );
  }
}
export default CheckoutHistory;
