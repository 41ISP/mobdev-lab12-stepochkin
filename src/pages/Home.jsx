import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container">
      <div className="home-content">
        <h1>Лабораторная работа 11</h1>
        <h2>Использование API</h2>
        <p>Выберите раздел:</p>
        
        <div className="home-links">
          <Link to="/rick-and-morty">Rick and Morty</Link>
          <Link to="/pokemon">Покемоны</Link>
          <Link to="/trivia">Викторина</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
