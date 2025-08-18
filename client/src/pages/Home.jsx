import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import AppDawnload from '../components/AppDawnload'
import Footer from '../components/Footer'

const home = () => {
  return (
    <div>
    <Navbar/>
    <Hero/>
    <JobListing/>
    <AppDawnload/>
    <Footer/>
    </div>
  )
}

export default home
