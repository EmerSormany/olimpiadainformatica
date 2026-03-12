import Header from './components/header/Header'
import './App.css'

function App() {

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* O resto do conteúdo do site vai entrar aqui depois */}
      <main className="flex items-center justify-center p-8">
        <h1 className="text-3xl font-bold text-slate-700">
          Bem-vindo ao sistema das Olimpíadas!
        </h1>
      </main>
    </div>
  )
}

export default App
