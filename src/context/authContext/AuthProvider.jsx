import React, { useEffect, useState } from 'react';
import { AuthContex } from './AuthContex';
import { createUserWithEmailAndPassword,  GoogleAuthProvider,  onAuthStateChanged, signInWithEmailAndPassword,  signInWithPopup,  signOut } from 'firebase/auth';
import { auth } from '../../firebase/Firebase.init';

const googleProvider=new GoogleAuthProvider()

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
  return signOut(auth)
  }
  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth,googleProvider)
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
    loading,
    signInWithGoogle
   
  }

  return (
    <AuthContex value={authInfo}>
      {children}
    </AuthContex>
  );
};

export default AuthProvider;
