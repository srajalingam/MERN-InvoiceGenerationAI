
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react'

import AppShell from './components/AppShell'
import Dashboard from './pages/Dashboard'
import CreateInvoice from './pages/CreateInvoice'

const ClerkProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

const App = () => {
  return (
    <div className='main-h-screen max-w-full owerflow-x-hidden'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={
          <ClerkProtectedRoute>
            <AppShell/>
          </ClerkProtectedRoute>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path='create-invoice' element={<CreateInvoice/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App