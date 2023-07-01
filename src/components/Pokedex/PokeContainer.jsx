import '../styles/pokedex/Pokecontainer.css';
import PokeCard from "./PokeCard";

const PokeContainer = ({ pokemons }) => {


  return (
    <div className="pokeContainer">
      <div className="pokeCard_body">
        {
          pokemons?.map(pokemon => (
            <PokeCard
              key={pokemon.url}
              url={pokemon.url}
            />
          ))
        }
      </div>
    </div>
  )
}

export default PokeContainer