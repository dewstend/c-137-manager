import axios from "axios";

export default axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": process.env.REACT_APP_API_KEY
  }
});
