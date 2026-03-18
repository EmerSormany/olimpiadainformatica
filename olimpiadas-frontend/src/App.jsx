import Header from './components/header/Header'
import Hero from './components/main/Hero'
import './App.css'
import Footer from './components/footer/Footer'

function App() {

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
      <div className="w-full z-10">
        <Header />
      </div>
      
      <main className="flex-grow flex items-center justify-center relative z-10">
        <Hero />
      </main>

      <Footer/>
    </div>
  )
}

export default App
