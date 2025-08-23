import React, { useContext } from 'react'
import logo_short from '../assets/logo-short.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserButton, useClerk, useUser} from '@clerk/clerk-react';
import AppContext from '../context/AppContext';

const Navbar = () => {
 const {openSignIn}= useClerk()
 const {user} = useUser()
 const navigate =useNavigate()
 const {setShowRecruiterLogin} = useContext(AppContext)


  return (
    <div  className='shadow py-4'>
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>

      <img onClick={()=>navigate('/')} src={logo_short} className="h-12 w-auto object-contain rounded-md shadow-[0_0_10px_rgba(13,27,76,0.5)] cursor-pointer" alt="Jobloom Logo" />
      {
        user
        ?<div className='flex items-center gap-3'>
            <Link to={'applications'}>Applied Jobs</Link>
            <p>|</p>
            <p className='max-sm:hidden '>Hi , {user.firstName+" "+user.lastName}</p>
            <UserButton />
        </div>
        :
        <div className='flex gap-4 max-sm:text-xs'>
        <button onClick={()=> setShowRecruiterLogin(true)} className='text-grey-600'>Recruiter Login</button>
        <button onClick={() =>openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full cursor-pointer'>Login</button>
      </div>
      }
      
      </div>
    </div>
  )
}

export default Navbar
