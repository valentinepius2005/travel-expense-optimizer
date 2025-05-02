import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center text-sm">
      &copy; {new Date().getFullYear()} Travel Expense Optimizer. All rights reserved.
    </footer>
  );
};

export default Footer;

