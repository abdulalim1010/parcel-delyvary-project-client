import React, { useState } from 'react';
import UseAuth from '../../../hooks/UseAuth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SocialLogin = () => {
  const { signInWithGoogle } = UseAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    if (isLoading) return;
  
    setIsLoading(true);
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;
        const email = user.email.toLowerCase(); // optional but helps avoid duplicate casing issues
        let userExists = false;
  
        try {
          const check = await axios.get(`${import.meta.env.VITE_API_URL}/users/${email}`);
          userExists = !!check.data?.email;
        } catch (error) {
          if (error.response?.status === 404) {
            userExists = false; // user doesn't exist — expected case
          } else {
            throw error; // real error, let outer .catch handle it
          }
        }
  
        if (!userExists) {
          const userInfo = {
            uid: user.uid,
            email: email,
            name: user.displayName,
            photoURL: user.photoURL,
            role: 'user',
            created_at: new Date().toISOString(),
            last_log_in: new Date().toISOString(),
          };
  
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
          console.log('✅ New Google user saved:', res.data);
        } else {
          console.log('ℹ️ Google user already exists.');
        }
  
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: `Welcome back, ${user.displayName}`,
        });
  
        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.error('Google Sign-in Error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  

  return (
    <div className="items-center mt-4 text-center">
      <p className="text-xl">OR</p>
      <button
        onClick={handleGoogleSignIn}
        className="btn w-max bg-white text-black border-[#e5e5e5]"
        disabled={isLoading}
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="mr-2"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff" />
            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
          </g>
        </svg>
        {isLoading ? 'Signing in...' : 'Login with Google'}
      </button>
    </div>
  );
};

export default SocialLogin;
