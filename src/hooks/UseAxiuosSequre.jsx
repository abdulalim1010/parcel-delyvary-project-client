import axios from 'axios';
import React from 'react';
const axiousSecure = axios.create({
  baseURL:`http://localhost:5000/`
})
const UseAxiuosSequre = () => {
  return axiousSecure;
};

export default UseAxiuosSequre;