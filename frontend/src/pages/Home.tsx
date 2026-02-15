import React from 'react'
import Navbar from '../components/Navbar'
import Hero from './Hero'
import Feature from '../components/Feature'
import Pricing from '../components/Pricing'

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
    </div>
  )
}

export default Home