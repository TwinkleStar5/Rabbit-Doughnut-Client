import axios from "axios"; //Axios is a popular JavaScript library used for making HTTP requests from a web browser or a Node.js server. Its primary purpose is to simplify the process of sending asynchronous HTTP requests and handling responses.

export const register = async (user) => {
  const res = await axios.post("http://localhost:8000/users/register", user);
  return res.data;
};
export const login = async (user) => {
  const res = await axios.post("http://localhost:8000/users/register", user);
  return res.data;
};
