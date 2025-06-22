import React, { use } from 'react';
import { AuthContex } from '../context/authContext/AuthContex';

const UseAuth = () => {
  const authInfo = use(AuthContex);
  return authInfo
};

export default UseAuth;