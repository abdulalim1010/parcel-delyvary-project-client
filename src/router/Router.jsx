
import {
  createBrowserRouter,

} from "react-router";

import MainLayOut from "../layout/MainLayOut";
import Home from "../pages/home/Home";

import Login from "../pages/authentiFication/Login";
import AuthLayout from "../pages/AuthLayout";
import Register from "../pages/authentiFication/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children: [
      {
        index: true,
        Component:Home
      }
      ,
      {
        
      }
   ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component:Register
      },

    ]
  }
]);