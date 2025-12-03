import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

// Reusable Layout component for wrapping pages
const Layout = ({ children }) => {
	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};

export default Layout;

// Usage Example:
/*
import React from 'react';
import Layout from './Layout';

const Dashboard = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <p>Your dashboard content here...</p>
      </div>
    </Layout>
  );
};

export default Dashboard;
*/
