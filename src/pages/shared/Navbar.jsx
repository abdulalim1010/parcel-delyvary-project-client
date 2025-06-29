import React from 'react';
import { Link, NavLink } from 'react-router';
import ProFastLogo from './ProFastLogo';
import UseAuth from '../../hooks/UseAuth';



const Navbar = () => {
  const { user,logOut } = UseAuth()
  const handleloguout = () => {
    logOut()
      .then(result => console.log(result))
    .catch(error=>console.log(error))
  }
  const navItem = <>
    
    <li ><NavLink to={"/"}>Home</NavLink></li>
    <li><NavLink to={"/covarage"}>Coverage</NavLink></li>
    <li><NavLink to={"/sendParcel"}>Send A parcel</NavLink></li>
    {
      user && <>
        <li><NavLink to={"/dashboard"}>Dashboard</NavLink></li>
      </>
    }
    <li><NavLink to={"/pricinge"}>Pricing</NavLink></li>
    

  </>
  return (
    <div className="navbar bg-base-100  npmrun decoration-violet-50shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {navItem}
      </ul>
    </div><ProFastLogo/>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navItem}
    </ul>
  </div>
  <div className="navbar-end gap-3">
        {
          user? <button onClick={handleloguout} className='btn primary text-black'>logout</button>:    <button className='btn btn-primary text-black'><Link to='/login'>Login</Link></button>
        }
       <li className='bg-green-200 text-white p-2.5 rounded-xl' ><NavLink to={"/beArider"}>Be Arider</NavLink></li>
        
  </div>
</div>
  );
};

export default Navbar;