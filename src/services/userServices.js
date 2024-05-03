import axios from "../setup/axios";

export const loginUser = (username, password) => {
  return axios.post("/login/login", {
    username,
    password,
  });
};
