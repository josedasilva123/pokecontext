import React from "react";

interface iStat{
    name: string;
}

export interface iPokemonStat{
    base_stat: number;
    effort: number;
    stat: iStat;
}

interface iPokemonSprites{
    front_default: string;
    back_default: string;
    front_female?: string;
    back_female?: string;
}

export interface iType{
    type: {
        name: string;
    }
}

export interface iPokemon{
    name: string;
    id: number;
    stats: iPokemonStat[];
    sprites: iPokemonSprites;
    types: iType[];
}

export interface iContextDefaultProps{
    children: React.ReactNode;
}