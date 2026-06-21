import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/header/Header'
import Hero from './components/main/Hero'
import Footer from './components/footer/Footer'
import About from './pages/About'
import './App.css'
import Form from './pages/Form'
import Login from './pages/Login'
import AdmPage from './pages/AdmPage'
import { useEffect, useState } from 'react'
import { supabase } from './utils/supabase'

function App() {

  const [session, setSession] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }}) => {
      setSession(session)
      setLoadingAuth(false)
    })

    const { data: {subscription }} = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoadingAuth(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loadingAuth) {
    return null
  }

  return (

    <Router>
      <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
        <div className="w-full z-10">
          <Header session={session} />
        </div>
        
        <main className="flex-grow flex items-center justify-center relative z-10">
          <Routes>
              <Route path='/' element={ <Hero/> } />
              <Route path='/about' element={ <About/> } />
              <Route path='/form' element={ <Form/> } />
              <Route path='/login' element={ session ? <Navigate to='/admin' replace/> : <Login/> } />
              <Route path='/admin' element={ session ? <AdmPage session={session} /> : <Navigate to='/login' replace/> } />
          </Routes>
        </main>

        <Footer/>
      </div>
    </Router>
  )
}

export default App
