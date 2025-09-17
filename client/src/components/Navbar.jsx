import React, { useContext } from 'react'
import logo_short from '../assets/logo-short.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserButton, useClerk, useUser } from '@clerk/clerk-react';
import AppContext from '../context/AppContext';

const Navbar = () => {
  const { openSignIn } = useClerk()
  const { user } = useUser()
  const navigate = useNavigate()
  const { setShowRecruiterLogin } = useContext(AppContext)

  return (
    <div className='shadow py-3 w-full'>
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center flex-wrap gap-3'>

        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          src={logo_short}
          className="h-10 sm:h-12 w-auto object-contain rounded-md shadow-[0_0_10px_rgba(13,27,76,0.5)] cursor-pointer"
          alt="Jobloom Logo"
        />

        {/* Right side */}
        {user ? (
          <div className='flex items-center gap-2 sm:gap-4 text-xs sm:text-sm overflow-x-auto flex-nowrap max-w-full'>
            <Link to={'/prep-tips'} className="whitespace-nowrap">Preparation Tips</Link>
            <p>|</p>

            <Link to={'/resume-check'} className="whitespace-nowrap">Resume Checker</Link>
            <p>|</p>

            <Link to={'/resume-templates'} className="whitespace-nowrap">Resume Templates</Link>
            <p>|</p>

            <Link to={'/applications'} className="whitespace-nowrap">Applied Jobs</Link>
            <p>|</p>

            <p className='whitespace-nowrap'>
              Hi, {user.firstName + " " + user.lastName}
            </p>
            <UserButton />
          </div>
        ) : (
          <div className='flex gap-2 sm:gap-4 text-xs sm:text-sm items-center'>
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className='text-gray-600 whitespace-nowrap'
            >
              Recruiter Login
            </button>
            <p>|</p>
            <button
              onClick={() => openSignIn()}
              className='bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-full cursor-pointer whitespace-nowrap'
            >
              Login
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Navbar
