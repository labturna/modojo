import axios from 'axios';
// Api service for axios
const ApiService = {

  // Base api url
  baseURL: 'https://jsonplaceholder.typicode.com/',

  // if authorization is required, setHeader must be added
  // setHeader() {
  //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  // },

  // GET
  async get(resource) {
    // this.setHeader();
    try {
      const response = await axios.get(`${this.baseURL}${resource}`);
      return response.data;
    } catch (error) {
      throw new Error(`API Error: ${error.response.status}`);
    }
  },

  // POST
  async post(resource, data) {
    // this.setHeader();
    try {
      const response = await axios.post(`${this.baseURL}${resource}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`API Error: ${error.response.status}`);
    }
  },

  // PUT
  async put(resource, data) {
    // this.setHeader();
    try {
      const response = await axios.put(`${this.baseURL}${resource}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`API Error: ${error.response.status}`);
    }
  },

  // DELETE
  async delete(resource) {
    // this.setHeader();
    try {
      const response = await axios.delete(`${this.baseURL}${resource}`);
      return response.data;
    } catch (error) {
      throw new Error(`API Error: ${error.response.status}`);
    }
  }
};

export default ApiService;
