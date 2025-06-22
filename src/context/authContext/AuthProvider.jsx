import React, { useEffect, useState } from 'react';
import { AuthContex } from './AuthContex';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase/Firebase.init';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);


  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logOut = () => {
    setLoading(true)
  return signOut
}




  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      console.log('user in the auth state  change',currentUser)
      setLoading(false)
    })
    return () => {
      unSubscribe();
    }
  
  },[])
  








  const authInfo = {
    createUser,
    signIn,
    user,
    logOut,
    loading
   
  }

  return (
    <AuthContex value={authInfo}>
      {children}
    </AuthContex>
  );
};

export default AuthProvider;
