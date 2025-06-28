import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from './socialLogin/SocialLogin';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [profile, setProfile] = useState('');
  const { createUser, upDateUserProfile } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const onSubmit = data => {
    createUser(data.email, data.password)
      .then(result => {
        const userProfile = {
          displayName: data.name,
          photoURL: profile,
        };

        return upDateUserProfile(userProfile);
      })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Account Created!',
          text: 'Welcome to Ema Parcel!',
        });
        navigate(from, { replace: true });
      })
      .catch(error => {
        console.error('Registration error:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        });
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image);

    const imageUploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLODE_KEY}`;

    try {
      const res = await axios.post(imageUploadURL, formData);
      setProfile(res.data.data.display_url);
    } catch (err) {
      console.error("Image upload failed:", err.message);
    }
  };

  return (
    <div className="card">
      <div className="card-body items-center justify-center">
        <h1 className="text-5xl font-bold mb-4">Create An Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset w-80 space-y-2">
            {/* Name */}
            <label className="label w-full">Your Name</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter your Name"
            />
            {errors.name?.type === 'required' && (
              <p className="text-red-500">Name is required</p>
            )}

            {/* Photo Upload */}
            <label className="label w-full mt-2">Profile Picture</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="input input-bordered w-full"
            />
            {profile && (
              <img src={profile} alt="Preview" className="w-20 h-20 rounded-full mt-2" />
            )}

            {/* Email */}
            <label className="label w-full mt-2">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input input-bordered w-full"
              placeholder="Email"
            />
            {errors.email?.type === 'required' && (
              <p className="text-red-500">Email is required</p>
            )}

            {/* Password */}
            <label className="label w-full mt-2">Password</label>
            <input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              className="input input-bordered w-full"
              placeholder="Password"
            />
            {errors.password?.type === 'required' && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className="text-red-500">Password must be at least 6 characters</p>
            )}

            <div className="w-full text-right">
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>

          <p className="text-xl font-semibold mt-3.5 gap-2">
            Already have an account?{' '}
            <Link className="btn btn-link" to="/login">
              Login
            </Link>
          </p>

          <SocialLogin />
        </form>
      </div>
    </div>
  );
};

export default Register;
