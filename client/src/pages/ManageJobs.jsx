import React from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import AppContext from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import Loading from '../components/Loading'

const ManageJobs = () => {

  const navigate = useNavigate()

  const [jobs, setJobs] = useState(false)
  const { backendUrl, companyToken } = useContext(AppContext)

  //function to fetch company job applications data 

  const fetchCompanyJobs = async () => {

        try {

          const {data} = await axios.get(backendUrl+'/api/company/list-jobs',
          {headers: {token:companyToken} }
          )

          if (data.success) {
            setJobs(data.jobsData.reverse())
            console.log(data.jobsData);
            
            
          }else{
            toast.error(data.message)
          }
          
        } catch (error) {

          toast.error(error.message)
          
        }
  }

  //Function to change job Visibility
  const changeJobVisibility = async (id) => {

    try {
      
      const {data} = await axios.post(backendUrl+'/api/company/change-visibility',
        { id},
        { headers: {token: companyToken} }
      )
      if (data.success) {
        toast.success(data.message)
        fetchCompanyJobs()
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {

      toast.error(error.message)
      
    }

  }

  useEffect(()=>{

    if (companyToken) {
      fetchCompanyJobs()
    }
    
  },[companyToken])

  return jobs ? jobs.length === 0 ? (<div></div>) :(
    <div className='container p-4 max-w-5xl'>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-300 max-sm:text-sm'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b border-gray-300 text-left max-sm:hidden'>#</th>
              <th className='py-2 px-4 border-b border-gray-300 text-left'>Job Title</th>
              <th className='py-2 px-4 border-b border-gray-300 text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 border-b border-gray-300 text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 border-b border-gray-300 text-center'>Applicants</th>
              <th className='py-2 px-4 border-b border-gray-300 text-left'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className='text-gray-700'>
              
                <td className='py-2 px-4 border-b border-gray-300 max-sm:hidden'>{index + 1}</td>
                <td className='py-2 px-4 border-b border-gray-300'>{job.title}</td>
                <td className='py-2 px-4 border-b border-gray-300 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 border-b border-gray-300 max-sm:hidden'>{job.location}</td>
                <td className='py-2 px-4 border-b border-gray-300'>{job.applicants}</td>
                <td className='py-2 px-4 border-b border-gray-300'>
                  <input onChange={()=>changeJobVisibility(job._id)} type="checkbox" className='scale-125 ml-4' checked={job.visible}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-4 flex justify-end'>
          <button onClick={()=>navigate('/dashboard/add-job')} className='bg-black text-white py-2 px-4 rounded'>Add new job</button>
        </div>
      </div>
    </div>
  ) : <Loading/>
}

export default ManageJobs
