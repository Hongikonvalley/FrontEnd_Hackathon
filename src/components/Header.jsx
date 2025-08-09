// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-white flex items-center justify-center p-4 border-b z-10">
      <Link to="/main" className="text-xl font-bold">
        more;ing
      </Link>
    </header>
  );
};

export default Header;
