import { useContext } from "use-context-selector";
import PokemonBattle from "./components/PokemonBattle";
import PokemonTeam from "./components/PokemonTeam";
import { PokeBattleContext } from "./contexts/PokeBattleContext";
import AppRoutes from "./routes";

function App() {
   const { battle } = useContext(PokeBattleContext);

   return (
      <div className="App">
         <PokemonTeam />
         {battle && <PokemonBattle />}
         <AppRoutes />
      </div>
   );
}

export default App;
