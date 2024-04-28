import axios from "axios";

export const loginUser = (username, password) => {
  return axios.post("http://localhost:3001/login", {
    username,
    password,
  });
};
