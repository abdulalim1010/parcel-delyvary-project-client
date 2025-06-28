import React, { useState } from 'react';
import UseAuth from '../../../hooks/UseAuth';

const SocialLogin = () => {
  const { signInWithGoogle } = UseAuth();
  const [isLoading, setIsLoading] = useState(false); // ✅ Add loading state

  const handleGoogleSignIn = () => {
    if (isLoading) return; // ✅ Prevent multiple clicks

    setIsLoading(true);
    signInWithGoogle()
      .then((result) => {
        console.log('Google Sign-in Success:', result.user);
      })
      .catch((error) => {
        console.error('Google Sign-in Error:', error);
      })
      .finally(() => {
        setIsLoading(false); // ✅ Reset loading
      });
  };

  return (
    <div className="items-center mt-4 text-center">
      <p className="text-xl">OR</p>
      <button
        onClick={handleGoogleSignIn}
        className="btn w-max bg-white text-black border-[#e5e5e5]"
        disabled={isLoading} // ✅ Disable while signing in
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
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            />
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            />
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            />
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            />
          </g>
        </svg>
        {isLoading ? 'Signing in...' : 'Login with Google'}
      </button>
    </div>
  );
};

export default SocialLogin;
