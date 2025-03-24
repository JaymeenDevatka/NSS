import React from "react";
import Header from "./Header"; // Import the Header component
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
