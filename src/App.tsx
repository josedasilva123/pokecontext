import { useContext } from "use-context-selector";
import PokemonBattle from "./components/PokemonBattle";
import PokemonTeam from "./components/PokemonTeam";
import { PokeBattleContext } from "./contexts/PokeBattleContext";
import AppRoutes from "./routes";
import { globalStyles } from "./styles/global";

function App() {
   const { battle } = useContext(PokeBattleContext);
   globalStyles();
   
   return (
      <div className="App">
         
         <PokemonTeam />
         {battle && <PokemonBattle />}
         <AppRoutes />
      </div>
   );
}

export default App;
