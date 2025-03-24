import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./components/sign_in/sign_in";
import SignUp from "./components/sign_up/sign_up";
import Dashboard from "./components/Dashboard/Dashboard";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Oops!</h1>
      <p className="text-gray-600 mt-2">We can't find the page you're looking for.</p>
      <a href="/" className="text-blue-500 mt-4 underline">
        Go back to Home
      </a>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />, // ✅ Default page (SignIn appears first)
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <ErrorPage />, // Handle unmatched routes (404)
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
