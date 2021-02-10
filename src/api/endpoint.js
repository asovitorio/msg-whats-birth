import axios from "axios";
console.log()
export default axios.create({
    baseURL: process.env.REACT_APP_URL
});