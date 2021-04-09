import React from "react";
import { Redirect } from "react-router";
import { resetKey, setKey } from "../utils/Key";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { done: false };
  }

  componentDidMount() {
    resetKey();
    window.location.href = "/";
  }

  render() {
    return <></>;
  }
}
export default Logout;
