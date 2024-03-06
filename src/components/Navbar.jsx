import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { logoutUser } from '../features/user';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector


const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);

  const handleLogout = () => {
    // Dispatch the logoutUser action
    dispatch(logoutUser());
  };
  return (
    <nav className="bg-transparent">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Logo />
        </a>
        
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-transparent">
            <li>
              <Link to="/home" className="text-white hover:text-rose-500">
                Home
              </Link>
            </li>
            {/* <li>
              <Link to="/predicted" className='text-white hover:text-rose-500'>History</Link>
            </li> */}
            {/* <li>
              <Link to="/record" className="text-white hover:text-rose-500">
                Record
              </Link>
            </li> */}
            <li>
              <Link to="/about" className="text-white hover:text-rose-500">
                About
              </Link>
            </li>
            <li>
              <Link to="/sentiment" className="text-white hover:text-rose-500">
                sentiment also
              </Link>
            </li>
            <li>
            {user && (
  <Link to="/profile" className="text-white hover:text-rose-500">
    Hello, {user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}
  </Link>
)}

            </li>
            <li>
              <Link onClick={handleLogout} to="/sign-in" className="text-white hover:text-rose-500">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
