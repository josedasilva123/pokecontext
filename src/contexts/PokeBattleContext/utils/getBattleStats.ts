import { iPokemonStat } from "../../types";

export const getBattleStats = (
  stats: iPokemonStat[],
  iv: number,
  level: number
) => {
  const baseEv = 50;

  function HPFormula(number: number) {
    const formulaA = 2 * number + iv + baseEv / 4;
    const formulaB = formulaA * (level / 100);
    const newValue = Math.round(formulaB + 10 + level);
    return newValue;
  }

  function StatsFormula(number: number) {
    const formulaA = 2 * number + iv + baseEv / 4;
    const formulaB = formulaA * (level / 100);
    const newValue = Math.round(formulaB + 5);
    return newValue;
  }

  const battleStatusList = stats.map((stat) => {
    if (stat.stat.name === "hp") {
      return {
        name: stat.stat.name,
        value: HPFormula(stat.base_stat),
      };
    } else {
      return {
        name: stat.stat.name,
        value: StatsFormula(stat.base_stat),
      };
    }
  });

  return battleStatusList;
};
