
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react'

import AppShell from './components/AppShell'
import Dashboard from './pages/Dashboard'
import CreateInvoice from './pages/CreateInvoice'
import Invoices from './pages/Invoices'
import InvoicePreview from './components/InvoicePreview'
import BusinessProfile from './pages/BusinessProfile'

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
          <Route path='invoices' element={<Invoices/>}/>
          <Route path='invoices/new' element={<CreateInvoice/>}/>
          <Route path='invoices/:id' element={<InvoicePreview/>}/>
          <Route path='invoices/:id/preview' element={<InvoicePreview/>}/>
          <Route path='invoices/:id/edit' element={<CreateInvoice/>}/>
          <Route path='create-invoice' element={<CreateInvoice/>}/>
          <Route path='business' element={ <BusinessProfile/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App