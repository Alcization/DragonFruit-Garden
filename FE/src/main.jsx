import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async'

import BlankLayout from './pages/blank.jsx'
import ErrorLayout from './pages/error.jsx'

import Introduce from './pages/introduce/introduce.jsx'
import Login from './pages/login/login.jsx'
import Forgot from './pages/forgot/forgot.jsx'
import Register from './pages/register/register.jsx'

import Layout from './pages/user/layout.jsx';

import DashBoard from './pages/user/dashboard/dashboard.jsx'
import Logs from './pages/user/logs/logs.jsx'
import Garden from './pages/user/garden/garden.jsx'
import Devices from './pages/user/devices/devices.jsx'
import Setting from './pages/user/setting/setting.jsx'
import Profile from './pages/user/profile/profile.jsx'

import ProtectedRoute from "./pages/protectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <BlankLayout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        path: '',
        element: <Introduce />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'forgot',
        element: <Forgot />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'user',
        element: <ProtectedRoute />, // Bảo vệ tất cả route con của "user"
        children: [
          {
            path: '',
            element: <Layout />,
            children: [
              { path: 'dashboard', element: <DashBoard /> },
              { path: 'logs', element: <Logs /> },
              { path: 'garden', element: <Garden /> },
              { path: 'devices', element: <Devices /> },
              { path: 'setting', element: <Setting /> },
              { path: 'profile', element: <Profile /> },
            ]
          }
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
)
