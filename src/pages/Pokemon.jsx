import { useState } from 'react'
import axios from 'axios'

function Pokemon() {
  const [name, setName] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(false)

  const findPokemon = () => {
    setLoading(true)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then(res => {
        setPokemon(res.data)
        setLoading(false)
      })
      .catch(err => {
        alert('Покемон не найден!')
        setLoading(false)
      })
  }

  return (
    <div className="container">
      <h1 className="page-title">Покемоны</h1>
      
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Введите имя (pikachu, charizard...)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn" onClick={findPokemon} style={{marginTop: '10px'}}>
          Найти
        </button>
      </div>

      {loading && <div className="loading">Загрузка...</div>}

      {pokemon && (
        <div style={{background: 'white', maxWidth: '500px', margin: '20px auto', padding: '20px'}}>
          <h2 style={{textAlign: 'center'}}>{pokemon.name.toUpperCase()}</h2>
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name}
            style={{display: 'block', margin: '0 auto', width: '200px'}}
          />
          <p><strong>Рост:</strong> {pokemon.height}</p>
          <p><strong>Вес:</strong> {pokemon.weight}</p>
          <p><strong>Опыт:</strong> {pokemon.base_experience}</p>
          <div>
            <strong>Способности:</strong>
            {pokemon.abilities.map((a, i) => (
              <span key={i}> {a.ability.name},</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Pokemon
