import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../Login/Login.scss";
import { Link, Redirect } from "react-router-dom";
import { checkLogin } from "../../utils/CheckLogin";

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = { isLogged: false };
  }

  async componentDidMount() {
    const checkedLogin = await checkLogin();
    this.setState({ isLogged: checkedLogin });
  }

  render() {
    if (this.state.isLogged)
      return (
        <>
          <Redirect to="/" />
        </>
      );
    return (
      <>
        <Navbar />
        <div className="login container">
          <div className="d-flex justify-content-center align-items-center">
            <div className="login__wrapper">
              <div className="login__header text-center">
                <h3 className="text-primary fw-bold">Register</h3>
                <p>Create an account.</p>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="email@yourdomain.com"
                />
                <label>Email Address</label>
              </div>
              <div className="form-floating mb-3 password">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="password"
                />
                <label>Password</label>
              </div>
              <div className="form-floating mb-3 password">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="password"
                />
                <label>Confirm Password</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="number"
                  placeholder="+62 xx-xxx-xxx-xxx"
                  value="+62 "
                />
                <label>Phone Number</label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  style={{ height: "100px" }}
                ></textarea>
                <label>Home Address</label>
              </div>
              <div className="mt-3 login-button">
                <button className="btn btn-primary w-100">Register</button>
              </div>
              <div className="text-center">
                <h5 className="text-black">Already Have an Account?</h5>
                <Link to="/login" className="btn btn-secondary mt-2">
                  Login Here!
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default Register;
