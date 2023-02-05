import { Link } from "react-router-dom";
import { useContext } from "use-context-selector";
import { PokeListContext } from "../../contexts/PokeListContext";
import { StyledText } from "../../styles/typography";

const PokedexPage = () => {
   const { pokeList } = useContext(PokeListContext);

   return (
      <div>
         <ul>
            {pokeList.map((pokemon) => (
               <li key={pokemon.name}>
                  <Link to={`/pokemon/${pokemon.name}`}>
                     <StyledText tag="span" fontWeight="bold" font={"secondary"} textTrasform={"capitalize"}>
                        {pokemon.name}
                     </StyledText>
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default PokedexPage;
