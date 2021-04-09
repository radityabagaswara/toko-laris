import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Login.scss";
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/API";
import Swal from "sweetalert2";
import { setKey } from "../../utils/Key";
import { checkLogin } from "../../utils/CheckLogin";

class Login extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLogged: false,
      passVis: false,
      email: null,
      password: null,
    };
  }

  async componentDidMount() {
    const checkedLogin = await checkLogin();
    this.setState({ isLogged: checkedLogin });
  }

  tryLogin = () => {
    if (!this.state.email || !this.state.password)
      return Swal.fire({
        icon: "error",
        title: "Whoops!",
        text: "Email or password not valid!",
      });

    const content = { email: this.state.email, password: this.state.password };
    API.post("/login", content)
      .then((resp) => {
        if (resp.status == 200) {
          Swal.fire({
            icon: "success",
            title: "Sucess!",
            text: "Please wait....",
            timer: 2500,
          });
          setKey(resp.data.at, resp.data.rt);
          localStorage.setItem(
            "d",
            JSON.stringify({ email: resp.data.email, name: resp.data.name })
          );
          window.location.href = "/";
        }
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status == 403) {
            Swal.fire({
              icon: "error",
              title: "Whoops!",
              text: "Email or password not valid!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Whoops!",
              text: "Please try again later!",
            });
          }
        }
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
                <h3 className="text-primary fw-bold">Login</h3>
                <p>Sign in to your account.</p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.tryLogin();
                }}
              >
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
                <div className="form-floating mb-1 password">
                  <input
                    type={this.state.passVis ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="password"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                  <label>Password</label>
                  {!this.state.passVis ? (
                    <FiEye
                      size="25px"
                      className="ms-1 hover"
                      onClick={() =>
                        this.setState({ passVis: !this.state.passVis })
                      }
                    />
                  ) : (
                    <FiEyeOff
                      size="25px"
                      className="ms-1 hover"
                      onClick={() =>
                        this.setState({ passVis: !this.state.passVis })
                      }
                    />
                  )}
                </div>
                <small>
                  <a href="/login">Forget Password?</a>
                </small>
                <div className="mt-3 login-button">
                  <button className="btn btn-primary w-100" type="submit">
                    Login
                  </button>
                </div>
                <div className="text-center">
                  <h5 className="text-black">Don't have an account?</h5>
                  <Link to="/register" className="btn btn-secondary mt-2">
                    Register Here!
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

export default Login;
