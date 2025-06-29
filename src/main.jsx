import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {

  Router,
  RouterProvider,
} from "react-router";
import { router } from './router/Router.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import AuthProvider from './context/authContext/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// ..
AOS.init();

const querclient=new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-7xl mx-auto'>
     <QueryClientProvider client={querclient}> <AuthProvider>
     <RouterProvider router={router} /></AuthProvider></QueryClientProvider>
   </div>
  </StrictMode>,
)
