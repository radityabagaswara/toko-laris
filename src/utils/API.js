import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4320",
  responseType: "json",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("a-t")}`,
  },
});
