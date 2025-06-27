import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';  // Use react-router-dom, not react-router
import SocialLogin from './socialLogin/SocialLogin';
import UseAuth from '../../hooks/UseAuth';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
const {signIn}=UseAuth()
  const location = useLocation();
  const navigate = useNavigate()
  const from=location.state?.from || '/'

  const onSubmit = data => {
    console.log(data);
    signIn(data.email, data.password)
      .then(result => {
        console.log(result.user)
         navigate(from)
      })
      .catch(error => {
      console.log(error)
    })
    // Handle login here (e.g., call auth function)
  };

  return (
    <div className="flex justify-center items-center bg-gray-100"> {/* Added missing space */}
      <div className="card max-w-2xl p-8">
        <div className="card-body items-center justify-center">
          <h1 className='text-black font-bold text-5xl mb-6'>Login now</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <fieldset className="fieldset mt-5 w-full">
              <label className="label">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input input-bordered w-full"
                placeholder="Email"
              />
              {errors.email?.type === 'required' &&
                <p className='text-red-500'>Email is required</p>
              }

              <label className="label mt-4">Password</label>
              <input
                type="password"
                {...register('password', { required: true, minLength: 6 })}
                className="input input-bordered w-full"
                placeholder="Password"
              />
              {errors.password?.type === 'required' &&
                <p className='text-red-500'>Password is required</p>
              }
              {errors.password?.type === 'minLength' &&
                <p className='text-red-500'>Password must be at least 6 characters</p>
              }

              <div className="mt-2">
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button className="btn btn-neutral mt-4 w-full">Login</button>
            </fieldset>
            <p className='text-xl font-semibold mt-3.5 gap-2'>
              You are new to the website?{' '}
              <Link className="btn btn-link" to='/register'>Register</Link>
            </p>
            <SocialLogin />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
