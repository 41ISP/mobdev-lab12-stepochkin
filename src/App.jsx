import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import RickAndMorty from './pages/RickAndMorty'
import Pokemon from './pages/Pokemon'
import Trivia from './pages/Trivia'

function App() {
  return (
    <Router>
      <div className="navbar">
        <nav>
          <NavLink to="/">Главная</NavLink>
          <NavLink to="/rick-and-morty">Rick and Morty</NavLink>
          <NavLink to="/pokemon">Покемоны</NavLink>
          <NavLink to="/trivia">Викторина</NavLink>
        </nav>
      </div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rick-and-morty" element={<RickAndMorty />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/trivia" element={<Trivia />} />
      </Routes>
    </Router>
  )
}

export default App

