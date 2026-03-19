import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Hero from './components/main/Hero'
import Footer from './components/footer/Footer'
import About from './pages/About'

function App() {

  return (

    <Router>
      <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
        <div className="w-full z-10">
          <Header />
        </div>
        
        <main className="flex-grow flex items-center justify-center relative z-10">
          <Routes>
              <Route path='/' element={ <Hero/> } />
              <Route path='/about' element={ <About/> } />
          </Routes>
        </main>

        <Footer/>
      </div>
    </Router>
  )
}

export default App
