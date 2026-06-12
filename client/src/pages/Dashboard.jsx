// import React, { useEffect } from 'react'
// import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom'
// import logo_short from '../assets/logo-short.png';
// import { assets } from '../assets/assets';
// import { useContext } from 'react';
// import AppContext from '../context/AppContext';

// const Dashboard = () => {

//     const navigate = useNavigate()
//     const { companyData, companyToken, isLoadingToken, setCompanyData, setCompanyToken } = useContext(AppContext)

//     const logout = () => {
//         setCompanyToken(null)
//         localStorage.removeItem('companyToken')
//         setCompanyData(null)
//         navigate('/')
//     }

//     useEffect(() => {
//         if (companyData) {
//             navigate('/dashboard/manage-jobs')
//         }
//     }, [companyData])

//     // 👇 Wait until localStorage token check is complete
//     if (isLoadingToken) {
//         return <div className='min-h-screen flex items-center justify-center'>Loading...</div>
//     }

//     // 👇 Only redirect if we're sure there's no token
//     if (!companyToken) {
//         return <Navigate to='/' replace />
//     }

//     return (
//         <div className='min-h-screen'>

//             {/* Navbar for Recruiter Panel */}
//             <div className='shadow py-4'>
//                 <div className='px-5 flex justify-between items-center'>
//                     <img onClick={() => navigate('/')} src={logo_short} alt="" className="h-12 w-auto object-contain rounded-md shadow-[0_0_10px_rgba(13,27,76,0.5)] cursor-pointer" />
//                     {companyData && (
//                         <div className='flex items-center gap-3'>
//                             <p className='max-sm:hidden'>Welcome, {companyData.name}</p>
//                             <div className='relative group'>
//                                 <img className='w-8 border rounded-full' src={companyData.image} alt="" />
//                                 <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
//                                     <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
//                                         <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className='flex items-start'>
//                 <div className='inline-block min-h-screen border-r-2'>
//                     <ul className='flex flex-col items-start pt-5 text-gray-800'>
//                         <NavLink
//                             className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}
//                             to={'/dashboard/add-job'}
//                         >
//                             <img className='min-w-4' src={assets.add_icon} alt="" />
//                             <p className='max-sm:hidden'>Add Job</p>
//                         </NavLink>

//                         <NavLink
//                             className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}
//                             to={'/dashboard/manage-jobs'}
//                         >
//                             <img className='min-w-4' src={assets.home_icon} alt="" />
//                             <p className='max-sm:hidden'>Manage Jobs</p>
//                         </NavLink>

//                         <NavLink
//                             className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}
//                             to={'/dashboard/view-applications'}
//                         >
//                             <img className='min-w-4' src={assets.person_tick_icon} alt="" />
//                             <p className='max-sm:hidden'>View Applications</p>
//                         </NavLink>
//                     </ul>
//                 </div>

//                 <div className='flex-1 h-full p-2 sm:p-5'>
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Dashboard

import React, { useEffect } from 'react'
import { NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import AppContext from '../context/AppContext'

const Dashboard = () => {

    const navigate = useNavigate()
    const { companyData, companyToken, isLoadingToken, setCompanyData, setCompanyToken } = useContext(AppContext)

    const logout = () => {
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        setCompanyData(null)
        navigate('/')
    }

    useEffect(() => {
        if (companyData) {
            navigate('/dashboard/manage-jobs')
        }
    }, [companyData])

    if (isLoadingToken) {
        return <div className='min-h-screen flex items-center justify-center'>Loading...</div>
    }

    if (!companyToken) {
        return <Navigate to='/' replace />
    }

    return (
        <div className='min-h-screen'>

            {/* Navbar */}
            <div className='shadow py-2'>
                <div className='px-3 flex justify-between items-center'>

                    {/* Logo — public/logo.png, transparent bg, no text */}
                    <img
                        onClick={() => navigate('/')}
                        src="/logo.png"
                        alt="NexHire"
                        className="h-16 w-auto object-contain cursor-pointer"
                    />

                    {companyData && (
                        <div className='flex items-center gap-3'>
                            <p className='max-sm text-sm text-gray-700'>
                                Welcome, {companyData.name}
                            </p>

                            {/* Profile circle — fixed size, proper circle */}
                            <div className='relative group'>
                                <img
                                    className='w-12 h-12 rounded-full object-cover border-2 border-gray-300 cursor-pointer flex-shrink-0'
                                    src={companyData.image}
                                    alt="profile"
                                />
                                <div className='absolute hidden group-hover:block top-full right-0 z-10 mt-1'>
                                    <ul className='list-none m-0 p-2 bg-white rounded-md border shadow-md text-sm min-w-[100px]'>
                                        <li
                                            onClick={logout}
                                            className='py-1 px-3 cursor-pointer hover:bg-gray-100 rounded text-gray-700'
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar + Content */}
            <div className='flex items-start'>
                <div className='inline-block min-h-screen border-r-2'>
                    <ul className='flex flex-col items-start pt-5 text-gray-800'>
                        <NavLink
                            className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}
                            to={'/dashboard/add-job'}
                        >
                            <img className='min-w-4' src={assets.add_icon} alt="" />
                            <p className='max-sm:hidden'>Add Job</p>
                        </NavLink>

                        <NavLink
                            className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}
                            to={'/dashboard/manage-jobs'}
                        >
                            <img className='min-w-4' src={assets.home_icon} alt="" />
                            <p className='max-sm:hidden'>Manage Jobs</p>
                        </NavLink>

                        <NavLink
                            className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}
                            to={'/dashboard/view-applications'}
                        >
                            <img className='min-w-4' src={assets.person_tick_icon} alt="" />
                            <p className='max-sm:hidden'>View Applications</p>
                        </NavLink>
                    </ul>
                </div>

                <div className='flex-1 h-full sm:p-5'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard