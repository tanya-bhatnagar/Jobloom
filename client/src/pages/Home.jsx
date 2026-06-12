import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import AppDawnload from '../components/AppDawnload'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #ffffff 0%, #fffbeb 40%, #fef3c7 100%)',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <Navbar />
      <Hero />
      <JobListing />
      <AppDawnload />
      <Footer />
    </div>
  )
}

export default Home


