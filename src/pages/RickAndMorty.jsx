import { useState, useEffect } from 'react'
import axios from 'axios'

function RickAndMorty() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getCharacters()
  }, [])

  const getCharacters = () => {
    setLoading(true)
    axios.get('https://rickandmortyapi.com/api/character')
      .then(res => {
        setCharacters(res.data.results)
        setLoading(false)
      })
  }

  const searchCharacter = () => {
    if(search === '') {
      getCharacters()
      return
    }
    setLoading(true)
    axios.get(`https://rickandmortyapi.com/api/character/?name=${search}`)
      .then(res => {
        setCharacters(res.data.results)
        setLoading(false)
      })
      .catch(err => {
        setCharacters([])
        setLoading(false)
      })
  }

  if (loading) {
    return <div className="loading">Загрузка...</div>
  }

  return (
    <div className="container">
      <h1 className="page-title">Rick and Morty</h1>
      
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Поиск персонажа"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn" onClick={searchCharacter} style={{marginTop: '10px'}}>
          Найти
        </button>
      </div>

      <div className="card-grid">
        {characters.map(char => (
          <div key={char.id} className="card">
            <img src={char.image} alt={char.name} />
            <div>
              <h3 className="card-title">{char.name}</h3>
              <p className="card-info">Статус: {char.status}</p>
              <p className="card-info">Вид: {char.species}</p>
              <p className="card-info">Пол: {char.gender}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RickAndMorty
