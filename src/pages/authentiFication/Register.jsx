import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../hooks/UseAuth';
import { Link } from 'react-router';
import SocialLogin from './socialLogin/SocialLogin';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  

 const {  createUser} =UseAuth()
  const onSubmit = data => {
    console.log(data)
    createUser(data.email, data.password)
      .then(result => {
      console.log(result.user)
      })
      .catch(error => {
      console.log(error)
    })
  }
  return (
    <div className="card">
      <div className="card-body items-center justify-center">
        <h1 className="text-5xl font-bold mb-4">Creat An Acount</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

<fieldset className="fieldset w-80 space-y-2"> {/* email field */}
          <label className="label w-full">Email</label>
            <input type="email" {...register('email', { required: true })} className="input input-bordered w-full" placeholder="Email" />
            {
            errors.email?.type ==='required'&&<p className='text-red-500'>email is required</p>
}
{/* password */}
          <label className="label w-full">Password</label>
          <input type="password"
              {...register('password', { minLength: 6 })} className="input input-bordered w-full" placeholder="Password" />
             
          {
            errors.password?.type==='required'&&<p className='text-red-500'>the password is not correct</p>
}
          {
            errors.password?.type ==='minLength'&&<p className='text-red-500'>the password must be more thean six correcter or more longer</p>
}


          <div className="w-full text-right">
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
          <p className='text-xl font-semibold mt-3.5 gap-2'>Already Have an account?<Link className='btn bg-[#CAEB66]' to='/login'>Login</Link></p>
          <SocialLogin></SocialLogin>
        </form>
      </div>
    </div>
  );
};

export default Register;
