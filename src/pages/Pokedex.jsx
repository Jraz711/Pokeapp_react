import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import PokeContainer from "../components/Pokedex/PokeContainer"
import useFetch from "../hooks/useFetch"


const Pokedex = () => {

  const [selectValue, setselectValue] = useState('all-pokemons')

  const trainerName = useSelector(states => states.trainerName)



  let url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
  const [pokemons, getAllPokemon, hasError, setPokemons] = useFetch(url)
  const urlTypes = 'https://pokeapi.co/api/v2/type'
  const [types, getAlltypes] = useFetch(urlTypes)

  useEffect(() => {
    if (selectValue === 'all-pokemons') {
      getAllPokemon()
    }
    else {
      axios.get(selectValue)
        .then(res => {
          const data = {
            results: res.data.pokemon.map(
              pokeInfo => pokeInfo.pokemon
            )
          }
          setPokemons(data)
        })
        .catch(err => console.log(err))

    }
  }, [selectValue])

  useEffect(() => {
    getAlltypes()
  }, [])


  const searchPokemon = useRef()
  const navigate = useNavigate()


  const handleSubmit = e => {
    e.preventDefault()
    const inputValue = searchPokemon.current.value.trim().toLowerCase()
    navigate(`/pokedex/${inputValue}`)
  }

  const handleChangeType = e => {
    setselectValue(e.target.value)
  }

  return (
    <div>
      {/* <header>
        <img src="" alt="" />
      </header> */}
      <p> <span> Welcome{trainerName}</span>!, Find Your Favorite Pokemon</p>
      <form onSubmit={handleSubmit}>
        <input ref={searchPokemon} type="text" placeholder="Search your favorite pokemon" />
        <button>Search</button>
      </form>
      <form>

      </form>
      <select onChange={handleChangeType}>
        <option value='all-pokemons'>All Pokemons</option>
        {
          types?.results.map(typeInfo => (
            <option
              value={typeInfo.url}
              key={typeInfo.url}
            >{typeInfo.name}</option>
          ))
        }
      </select>
      <PokeContainer pokemons={pokemons?.results} />
    </div>
  )
}

export default Pokedex