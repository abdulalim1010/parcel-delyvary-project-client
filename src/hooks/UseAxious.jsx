import axios from "axios";

const axiousInstance = axios.create({
  baseURL:`http://localhost:5000`
})
const UseAxious = () => {
  return axiousInstance;
};

export default UseAxious;