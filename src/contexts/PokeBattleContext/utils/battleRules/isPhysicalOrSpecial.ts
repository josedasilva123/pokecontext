export function isPhysicalOrSpecial(moveCategory: string){
    let attack: number;
    let defense: number;
    if (moveCategory === "physical") {
      attack = 1;
      defense = 2;
    } else {
      attack = 3;
      defense = 4;
    }

    return {
        attack,
        defense,
    }
}