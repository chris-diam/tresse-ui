import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";

const Layout = ({ children }) => (
  <div className="min-h-screen bg-[#f0f0e5] flex flex-col">
    <Header />
    <main className="flex-1 w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
