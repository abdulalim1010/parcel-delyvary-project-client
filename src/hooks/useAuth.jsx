import React, { useContext } from 'react';
import { AuthContex } from '../context/authContext/AuthContex';

const UseAuth = () => {
  const authInfo = useContext(AuthContex);
  return authInfo;
};

export default UseAuth;
