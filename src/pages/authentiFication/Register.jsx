import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../hooks/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // ✅ Corrected import
import SocialLogin from './socialLogin/SocialLogin';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser } = UseAuth(); // ✅ Correct usage
  const location = useLocation();
const navigate = useNavigate();
const from = location.state?.from?.pathname || '/';

const onSubmit = data => {
  console.log(data);
  createUser(data.email, data.password)
    .then(result => {
      console.log('User created:', result.user);
      navigate(from, { replace: true }); // ✅ fixed
    })
    .catch(error => {
      console.error('Error creating user:', error.message);
    });
};

  return (
    <div className="card">
      <div className="card-body items-center justify-center">
        <h1 className="text-5xl font-bold mb-4">Create An Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset w-80 space-y-2">
            {/* Email */}
            <label className="label w-full">Email</label>
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
