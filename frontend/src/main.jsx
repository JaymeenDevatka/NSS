import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import SignIn from './components/sign_in/sign_in.jsx';
import SignUp from './components/sign_up/sign_up.jsx';
import Layout from './layout.jsx';
import Dashboard from './components/Dashboard/Dashboard';
import Events from './components/Events/Events.jsx';
import Photos from './components/Photos/Photos.jsx';
import CertificateTable from './components/CertificateGenerator/CertificateTable.jsx';
import Feedback from './components/EventFeedBack/Feedback.jsx';
import LandingPage from './components/Landing/landingpage.jsx';
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx'
import DashboardRedirect from './utils/DashboardRedirect.jsx'

import ProtectedRoute from './utils/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import AllEventFeedback from './components/EventFeedBack/AllEventFeedback.jsx';
import FeedbackForm from './components/EventFeedBack/FeedbackForm.jsx';

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<LandingPage />} />
      <Route path='SignIn' element={<SignIn />} />
      <Route path='SignUp' element={<SignUp />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<DashboardRedirect />} />
  <Route path="/user-dashboard" element={<Dashboard />} />
  </Route>

  <Route element={<ProtectedRoute requiredRole="admin" />}>
  <Route path="/admin-dashboard" element={<AdminDashboard />} />
  </Route>

      <Route element={<ProtectedRoute />}>
        <Route path='Events' element={<Events />} />
        <Route path='Dashboard' element={<Dashboard />} />
        <Route path='Photos' element={<Photos />} />
        <Route path='registrations' element={<CertificateTable />} />
        <Route path='feedback' element={<FeedbackForm />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </StrictMode>
);
