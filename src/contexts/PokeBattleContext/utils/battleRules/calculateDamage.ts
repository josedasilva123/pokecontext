export function calculateDamage(
  base: number,
  multiplier: number,
  attack: number,
  defense: number
) {
  const formula1 = (2 * 50) / 5 + 2;
  const formula2 = (formula1 * base * (attack / defense)) / 50;
  const formula3 = (formula2 + 2) * multiplier;
  const formula4 = Math.random() * 15;
  const formula5 = (100 - formula4) / 100;
  const finalFormula = Math.round(formula3 * formula5);
  return finalFormula;
}
