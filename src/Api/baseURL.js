import axios from 'axios'


const baseUrl = axios.create({
  baseURL: "https://backend-ecommerce-test.vercel.app",
});

export default baseUrl