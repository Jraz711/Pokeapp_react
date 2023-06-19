import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"

const PokedexName = () => {

  const { name } = useParams()

  const url = `https://pokeapi.co/api/v2/pokemon/${name}`
  const [pokemon, getPokemonByName, hashError] = useFetch(url)

  useEffect(() => {
    getPokemonByName()
  }, [name])

  console.log(pokemon);

  return (
    <div>
      {
        hashError
          ? <h1><span>{name}</span> not exits</h1>
          : (
            <>
              <img src={pokemon.sprites.other['official-artwork'].front_default}
                alt=" "
              />
              <h2>{pokemon?.name}</h2>
            </>
          )
      }
    </div>
  )
}

export default PokedexName