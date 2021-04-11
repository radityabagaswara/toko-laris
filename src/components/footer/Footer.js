import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = (props) => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row justify-content-center text-align-center">
          <div className="col-md-6 mt-5">
            <h3 className="text-primary fw-bold">
              TokoLaris.id
              <span className="fs-5 fw-lighter ms-2">Marketplace</span>
            </h3>
            <p className="text-secondary">
              Menyediakan berbagai macam kebutuhan rumah tangga. <br />
              Sing penting laris lur!
            </p>
            <div className="footer__counter mt-3">
              <div className="text-primary">
                <h6 className="fw-bold">
                  15.283 <span className="text-white fw-light"> Products</span>
                </h6>
              </div>
              <div className="text-primary">
                <h6 className="fw-bold">
                  20.545{" "}
                  <span className="text-white fw-light"> Items Sold</span>
                </h6>
              </div>
              <div className="text-primary">
                <h6 className="fw-bold">
                  232
                  <span className="text-white fw-light"> Brand Coverage</span>
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 mt-3">
            <h6>TokoLaris.id</h6>
            <ul>
              <li>
                <Link>About Us</Link>
              </li>
              <li>
                <Link>Jobs</Link>
              </li>
              <li>
                <Link>Blog</Link>
              </li>
              <li>
                <Link>Terms of Service</Link>
              </li>
              <li>
                <Link>Privacy Policy</Link>
              </li>
              <li>
                <Link>Brand Partnership</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 mt-3">
            <h6>Customers</h6>
            <ul>
              <li>
                <Link>Cara Pembelian</Link>
              </li>
              <li>
                <Link>FAQ</Link>
              </li>
              <li>
                <Link>Return Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center pt-5">
          © Copyright {new Date().getFullYear()} TokoLaris.id All right reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
