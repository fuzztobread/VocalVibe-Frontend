import React from 'react';
import Button from './Button';
import Logo from './Logo';

const Navbar = () => {
  return (
    <nav className="bg-transparent">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Logo />
        </a>
        
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-transparent">
            <li>
              <a href="/" className="text-white hover:text-rose-500" aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-white hover:text-rose-500">
                About
              </a>
            </li>
            <li>
              <a href="/sign-in" className="text-white hover:text-rose-500">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
