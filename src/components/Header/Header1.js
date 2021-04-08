import React from "react";
import { UndrawOnlineShopping } from "react-undraw-illustrations";
import "./Header.scss";
import Lottie from "lottie-react-web";
import marketplace1 from "../../lootie/marketplace1.json";

const Header1 = (props) => {
  return (
    <div className={`header ${props.className}`}>
      <div className="row header__content m-auto align-items-center text-white">
        <div className="col-lg-7 col-md-9">
          <h3 className="fw-light">
            Lebih dari <strong className="fw-bold text-primary">10.000</strong>{" "}
            produk rumah tangga tersedia di{" "}
            <strong className="fw-bold text-primary">Toko Laris</strong>
          </h3>
          <h5 className="text-primary mt-3">Mulai belanja sekarang!</h5>
          <div className="header__search mt-4">
            <form
              className="row align-items-center"
              onSubmit={() => {
                alert("clicked!");
              }}
            >
              <div className="form-group col-md-7">
                <input
                  className="form-control"
                  placeholder="Cari kebutuhan mu..."
                />
              </div>
              <div className="form-group col-md-5">
                <button className="btn btn-primary">Search</button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-5 col-md-3 text-end">
          <Lottie
            options={{
              animationData: marketplace1,
              loop: true,
              autoplay: true,
            }}
            style={{ maxHeight: "500px" }}
          />
          {/* <UndrawOnlineShopping
              primaryColor="#303179"
              accentColor="#141850"
            /> */}
        </div>
      </div>
    </div>
  );
};

export default Header1;
