import React from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import AppContext from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ManageJobs = () => {

    const navigate = useNavigate()
    const [jobs, setJobs] = useState(false)
    const { backendUrl, companyToken } = useContext(AppContext)

    const fetchCompanyJobs = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/company/list-jobs',
                { headers: { token: companyToken } }
            )
            if (data.success) {
                setJobs(data.jobsData.reverse())
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeJobVisibility = async (id) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/company/change-visibility',
                { id },
                { headers: { token: companyToken } }
            )
            if (data.success) {
                toast.success(data.message)
                fetchCompanyJobs()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (companyToken) {
            fetchCompanyJobs()
        }
    }, [companyToken])

    if (!jobs) return <Loading />

    if (jobs.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center h-[70vh] gap-4'>
                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center'>
                    <svg className='w-7 h-7 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                    </svg>
                </div>
                <div className='text-center'>
                    <p className='text-gray-800 font-medium'>No jobs posted yet</p>
                    <p className='text-gray-500 text-sm mt-1'>Create your first listing to get started</p>
                </div>
                <button
                    onClick={() => navigate('/dashboard/add-job')}
                    className='mt-2 flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium py-2.5 px-5 rounded-lg transition-colors'
                >
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                    </svg>
                    Add new job
                </button>
            </div>
        )
    }

    return (
        <div className='p-6 max-w-5xl'>

            {/* Page header */}
            <div className='flex items-end justify-between mb-6'>
                <div>
                    <h1 className='text-xl font-semibold text-gray-900'>Manage Jobs</h1>
                    <p className='text-sm text-gray-500 mt-0.5'>{jobs.length} listing{jobs.length !== 1 ? 's' : ''} posted</p>
                </div>
                <button
                    onClick={() => navigate('/dashboard/add-job')}
                    className='flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors'
                >
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                    </svg>
                    Add new job
                </button>
            </div>

            {/* Table */}
            <div className='bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm'>
                <div className='overflow-x-auto'>
                    <table className='min-w-full'>
                        <thead>
                            <tr className='bg-gray-50 border-b border-gray-100'>
                                <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-sm:hidden w-10'>#</th>
                                <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Job Title</th>
                                <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-sm:hidden'>Date</th>
                                <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-sm:hidden'>Location</th>
                                <th className='py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'>Applicants</th>
                                <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Visible</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-50'>
                            {jobs.map((job, index) => (
                                <tr key={index} className='hover:bg-gray-50 transition-colors duration-100'>

                                    <td className='py-3.5 px-4 max-sm:hidden'>
                                        <span className='text-xs font-mono text-gray-400'>
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </td>

                                    <td className='py-3.5 px-4'>
                                        <div className='font-medium text-sm text-gray-900'>{job.title}</div>
                                        <div className='text-xs text-gray-400 mt-0.5'>{job.category} · {job.level}</div>
                                    </td>

                                    <td className='py-3.5 px-4 max-sm:hidden'>
                                        <span className='text-sm text-gray-500'>{moment(job.date).format('MMM D, YYYY')}</span>
                                    </td>

                                    <td className='py-3.5 px-4 max-sm:hidden'>
                                        <span className='text-sm text-gray-600'>{job.location}</span>
                                    </td>

                                    <td className='py-3.5 px-4 text-center'>
                                        <span className='inline-flex items-center justify-center min-w-[2rem] px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700'>
                                            {job.applicants}
                                        </span>
                                    </td>

                                    <td className='py-3.5 px-4'>
                                        <label className='relative inline-flex items-center cursor-pointer'>
                                            <input
                                                type='checkbox'
                                                className='sr-only peer'
                                                onChange={() => changeJobVisibility(job._id)}
                                                checked={job.visible}
                                                readOnly={false}
                                            />
                                            <div className='w-9 h-5 bg-gray-200 peer-checked:bg-gray-900 rounded-full transition-colors duration-200 after:content-[""] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4 relative'></div>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageJobs