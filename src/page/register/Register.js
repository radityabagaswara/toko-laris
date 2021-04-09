import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../Login/Login.scss";
import { Link, Redirect } from "react-router-dom";
import { checkLogin } from "../../utils/CheckLogin";
import Swal from "sweetalert2";
import API from "../../utils/API";

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLogged: false,
      name: null,
      email: null,
      password: null,
      confirm_password: null,
      phone_number: null,
      address: null,
    };
  }

  async componentDidMount() {
    const checkedLogin = await checkLogin();
    this.setState({ isLogged: checkedLogin });
  }

  registerUser = () => {
    console.log(this.state);
    if (
      !this.state.name ||
      !this.state.email ||
      !this.state.password ||
      !this.state.confirm_password ||
      !this.state.phone_number ||
      !this.state.address
    )
      return Swal.fire({
        icon: "error",
        title: "Whoops",
        text: "Please enter all fields!",
      });

    if (this.state.password != this.state.confirm_password)
      return Swal.fire({
        icon: "error",
        title: "Whoops",
        text: "Password not match!",
      });

    const content = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirm_password: this.state.confirm_password,
      phone_number: this.state.phone_number,
      address: this.state.address,
    };
    API.post("/register", content)
      .then((resp) => {
        if (resp.status == 200) {
          return Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Account successfully registered!",
          }).then(() => {
            window.location.href = "/login";
          });
        }
      })
      .catch((err) => {
        return Swal.fire({
          icon: "error",
          title: "Whoops",
          text: "There's something wrong while creating account!",
        });
      });
  };

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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.registerUser();
                }}
              >
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="John Doe"
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                  <label>Full Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="email@yourdomain.com"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                  <label>Email Address</label>
                </div>
                <div className="form-floating mb-3 password">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="password"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                  <label>Password</label>
                </div>
                <div className="form-floating mb-3 password">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="password"
                    onChange={(e) =>
                      this.setState({ confirm_password: e.target.value })
                    }
                  />
                  <label>Confirm Password</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="number"
                    placeholder="+62 xx-xxx-xxx-xxx"
                    onChange={(e) =>
                      this.setState({ phone_number: e.target.value })
                    }
                  />
                  <label>Phone Number</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    style={{ height: "100px" }}
                    onChange={(e) => this.setState({ address: e.target.value })}
                  ></textarea>
                  <label>Home Address</label>
                </div>
                <div className="mt-3 login-button">
                  <button className="btn btn-primary w-100" type="submit">
                    Register
                  </button>
                </div>
                <div className="text-center">
                  <h5 className="text-black">Already Have an Account?</h5>
                  <Link to="/login" className="btn btn-secondary mt-2">
                    Login Here!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default Register;
