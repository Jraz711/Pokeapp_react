import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import './styles/pokedexName.css'

const PokedexName = () => {

  const { name } = useParams()

  const url = `https://pokeapi.co/api/v2/pokemon/${name}`
  const [pokemon, getPokemonByName, hasError] = useFetch(url)

  const navigate = useNavigate()

  const handleNavigatePokedex = e => {
    e.preventDefault()
    navigate('/pokedex')
  }

  useEffect(() => {
    getPokemonByName()
  }, [name])

  return (
    <div>
      <div className="pokedexName">
        <header className="pokedex_header">
          <img className='pokedex_header-img' src="./src/assets/images/headerpokedex.svg" alt="" />
          <img onClick={handleNavigatePokedex} className='pokedex_header-logo' src="./src/assets/images/logopokedex.svg" alt="" />
          <img className='pokedex_header-pokebola' src="./src/assets/images/pokebola.svg" alt="" />
        </header>
        <div className={`pokedexName_body ${pokemon?.types[0].type.name}`}>
          {
            hasError
              ? <h1>❌ The pokemon "<span>{name}</span>" doesn't exist </h1>
              : (
                <>
                  <header className={`pokemon_header bg-${pokemon?.types[0].type.name}`}>
                    <img className='pokemon_img' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
                  </header>
                  <div className="pokemon_info">
                    <div className="box-id">
                      <h2 className="pokemon_id">#{pokemon?.id}</h2>
                    </div>
                    <div className="box-name">
                      <hr className="pokemon_line" /><h2 className="pokemon_name">{pokemon?.name}</h2><hr className="pokemon_line" />
                    </div>
                    <ul className="pokemon_ul-wh">
                      <li className="pokemon_li-w">
                        <span className="pokemon_weight">Weight</span>
                        <span className="pokemon_weight-value">{pokemon?.weight}</span>
                      </li>
                      <li className="pokemon_li-h">
                        <span className="pokemon_height">Height</span>
                        <span className="pokemon_height-value">{pokemon?.height}</span>
                      </li>
                    </ul>
                    <ul className="pokemon_ul-ta">
                      <li className="pokemon_li-t">
                        <span className="pokemon_type">Type</span>
                        <span className="pokemon_type-value">
                          {
                            pokemon?.types.map(typeInfo => (
                              <li className={`pokemon_types_item bg-${pokemon?.types[0].type.name}`}
                                key={typeInfo.type.url}>
                                {typeInfo.type.name}
                              </li>
                            ))
                          }
                        </span>
                      </li>
                      <li className="pokemon_li-a">
                        <span className="pokemon_abilities">Abilities</span>
                        <span className="pokemon_abilities-value">{
                          pokemon?.abilities.map(abilityInfo => (
                            <li className='pokemon_abilities_item'
                              key={abilityInfo.ability.url}>
                              {abilityInfo.ability.name}
                            </li>
                          ))}</span>
                      </li>
                    </ul>

                  </div>
                </>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default PokedexName