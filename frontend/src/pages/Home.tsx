import React from 'react'
import Navbar from '../components/Navbar'
import Hero from './Hero'

function Home() {
  return (
    <div>
        <Navbar />
        <main className=''>
          <Hero />
        </main>
    </div>
  )
}

export default Home