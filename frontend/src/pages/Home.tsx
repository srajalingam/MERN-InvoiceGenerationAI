import React from 'react'
import Navbar from '../components/Navbar'
import Hero from './Hero'
import Feature from '../components/Feature'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
        <Navbar />
        <main className=''>
          <Hero />
          <div className=''>
            <Feature />
          </div>
          <Pricing />
        </main>
        <Footer />
    </div>
  )
}

export default Home