import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import PokeContainer from "../components/Pokedex/PokeContainer"
import useFetch from "../hooks/useFetch"

const Pokedex = () => {

  const trainerName = useSelector(states => states.trainerName)

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
  const [pokemons, getAllPokemon] = useFetch(url)

  useEffect(() => {
    getAllPokemon()
  }, [])


  const searchPokemon = useRef()
  const navigate = useNavigate()


  const handleSubmit = e => {
    e.preventDefault()
    const inputValue = searchPokemon.current.value.trim().toLowerCase()
    navigate(`/pokedex/${inputValue}`)
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
      <PokeContainer pokemons={pokemons?.results} />
    </div>
  )
}

export default Pokedex