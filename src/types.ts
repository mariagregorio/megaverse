import { Cometh, Polyanet, Soloon } from "./MergaverseElements";

export type ElementRequestBody = {
    candidateId?: string;
    row: number;
    column: number;
    color?: SoloonColors;
    direction?: ComethDirections;
};

export enum Elements {
    POLYANET = 'polyanet',
    SOLOON = 'soloon',
    COMETH = 'cometh',
}

export type ElementsDetails = {
    polyanets: Polyanet[],
    soloons: Soloon[],
    comeths: Cometh[],
}

export enum SoloonColors {
    RED = 'red',
    BLUE = 'blue',
    PURPLE = 'purple',
    WHITE = 'white',
}

export enum ComethDirections {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
}

export type Goal = {
    goal: string[][];
};

export type Coords = {
    row: number;
    column: number;
};