import React from 'react'
import Navbar from '../components/Navbar'
import Hero from './Hero'
import Feature from '../components/Feature'

function Home() {
  return (
    <div>
        <Navbar />
        <main className=''>
          <Hero />
          <div className=''>
            <Feature />
          </div>
        </main>
    </div>
  )
}

export default Home