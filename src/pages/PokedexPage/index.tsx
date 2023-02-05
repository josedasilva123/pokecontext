import { Link } from "react-router-dom";
import { useContext } from "use-context-selector";
import { PokeListContext } from "../../contexts/PokeListContext";

const PokedexPage = () => {
   const { pokeList } = useContext(PokeListContext);

   return (
      <div>
         <ul>
            {pokeList.map((pokemon) => (
               <li key={pokemon.name}>
                  <Link to={`/pokemon/${pokemon.name}`}>
                     <h3>{pokemon.name}</h3>
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default PokedexPage;
