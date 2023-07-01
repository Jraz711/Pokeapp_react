import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import PokeContainer from "../components/Pokedex/PokeContainer"
import useFetch from "../hooks/useFetch"
import './styles/pokedex.css'


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
    <div className="pokedex">
      <header className="pokedex_header">
        <img className='pokedex_header-img' src="./src/assets/images/headerpokedex.svg" alt="" />
        <img className='pokedex_header-logo' src="./src/assets/images/logopokedex.svg" alt="" />
        <img className='pokedex_header-pokebola' src="./src/assets/images/pokebola.svg" alt="" />
      </header>
      <div className="pokedex_body">
        <p className="pokedex_body-p"> <span className="pokedex_body-span">Bienvenido {trainerName},</span> aquí podrás encontrar tu pokemón favorito</p>
        <div className="pokedex_body-form">
          <form className="form" onSubmit={handleSubmit}>
            <input className="pokedex_form-input" ref={searchPokemon} type="text" placeholder="Buscar un pokemon" />
            <button className="pokedex_form-btn">Buscar</button>
          </form>
          <select className="pokedex_select" onChange={handleChangeType}>
            <option value='all-pokemons'>Todos los pokemones</option>
            {
              types?.results.map(typeInfo => (
                <option className="pokedex_option-types"
                  value={typeInfo.url}
                  key={typeInfo.url}
                >{typeInfo.name}</option>
              ))
            }
          </select>
        </div>
      </div>
      <PokeContainer pokemons={pokemons?.results} />
    </div>
  )
}

export default Pokedex