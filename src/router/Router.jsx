
import {
  createBrowserRouter,

} from "react-router";

import MainLayOut from "../layout/MainLayOut";
import Home from "../pages/home/Home";

import Login from "../pages/authentiFication/Login";
import AuthLayout from "../pages/AuthLayout";
import Register from "../pages/authentiFication/Register";

import Coverage from "../pages/covarage/Coverage";
import PrivateRoute from "../routs/PrivateRoute";
import SendParcel from "../pages/sendParcel/ParcelForm";
import ParcelForm from "../pages/sendParcel/ParcelForm";
import DashboardLayout from "../DashboardLayout";
import Myparcel from "../pages/dahsboard/myparcel/Myparcel";
import BeARider from "../pages/BeARider";


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
        path: '/covarage',
        Component:Coverage
        
      },
      {
        path: 'sendParcel',
        element:<PrivateRoute><ParcelForm></ParcelForm></PrivateRoute>
      }
      , {
        path: '/beArider',
        element:<PrivateRoute><BeARider></BeARider></PrivateRoute>
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
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: 'myparcel',
        Component:Myparcel
      }
    ]
  }
]);