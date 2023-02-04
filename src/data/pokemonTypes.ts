export const types = [
    {
      type: "normal",
      halfDamage: ["fighting"],
      doubleDamage: [],
      imune: ["ghost"],
    },
    {
      type: "fire",
      halfDamage: ["fire", "grass", "ice", "bug", "steel", "fairy"],
      doubleDamage: ["water", "ground", "rock"],
      imune: [],
    },
    {
      type: "water",
      halfDamage: ["fire", "water", "ice", "steel"],
      doubleDamage: ["grass", "electric"],
      imune: [],
    },
    {
      type: "grass",
      halfDamage: ["water", "grass", "electric", "ground"],
      doubleDamage: ["fire", "ice", "poison", "flying", "bug"],
      imune: [],
    },
    {
      type: "electric",
      halfDamage: ["electric", "flying", "steel"],
      doubleDamage: ["ground"],
      imune: [],
    },
    {
      type: "ice",
      halfDamage: ["ice"],
      doubleDamage: ["fire", "fighting", "rock", "steel"],
      imune: [],
    },
    {
      type: "fighting",
      halfDamage: ["bug", "rock", "dark"],
      doubleDamage: ["flying", "psychic", "fairy"],
      imune: [],
    },
    {
      type: "poison",
      halfDamage: ["grass", "fighting", "poison", "fairy"],
      doubleDamage: ["ground", "psychic"],
      imune: [],
    },
    {
      type: "ground",
      halfDamage: ["poison", "rock"],
      doubleDamage: ["water", "grass", "ice"],
      imune: ["electric"],
    },
    {
      type: "flying",
      halfDamage: ["grass", "fighting", "bug"],
      doubleDamage: ["electric", "ice", "rock"],
      imune: ["ground"],
    },
    {
      type: "psychic",
      halfDamage: ["fighting", "psychic"],
      doubleDamage: ["bug", "ghost", "dark"],
      imune: [],
    },
    {
      type: "bug",
      halfDamage: ["grass", "fighting", "ground"],
      doubleDamage: ["fire", "flying", "rock"],
      imune: [],
    },
    {
      type: "rock",
      halfDamage: ["normal", "fire", "poison", "flying"],
      doubleDamage: ["water", "grass", "fighting", "ground", "steel"],
      imune: [],
    },
    {
      type: "ghost",
      halfDamage: ["poison", "bug"],
      doubleDamage: ["ghost", "dark"],
      imune: ["normal", "fighting"],
    },
    {
      type: "dragon",
      halfDamage: ["fire", "water", "grass", "electric"],
      doubleDamage: ["ice", "dragon", "fairy"],
      imune: [],
    },
    {
      type: "dark",
      halfDamage: ["ghost", "dark"],
      doubleDamage: ["fighting", "bug", "fairy"],
      imune: ["psychic"],
    },
    {
      type: "steel",
      halfDamage: ["normal", "grass", "ice", "flying", "psychic", "bug", "rock"],
      doubleDamage: ["fire", "fighting", "ground"],
      imune: ["poison"],
    },
    {
      type: "fairy",
      halfDamage: ["fighting", "bug", "dark"],
      doubleDamage: ["steel", "poison"],
      imune: ["dragon"],
    },
  ];
  
  