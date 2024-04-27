export type PolyanetRequestBody = {
    candidateId: string;
    row: number;
    column: number;
};

export enum Elements {
    POLYANET = 'polyanet',
    SOLOON = 'soloon',
    COMETH = 'cometh',
}

export enum SoloonColors {
    RED = 'red',
    BLUE = 'blue',
    PURPLE = 'purple',
    WHITE = 'white',
}

export enum Directions {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
}

export type SoloonRequestBody = {
    candidateId: string;
    row: number;
    column: number;
    color: SoloonColors;
}

export type ComethRequestBody = {
    candidateId: string;
    row: number;
    column: number;
    direction: Directions
}

export type Goal = {
    goal: string[][];
};

export type Coords = {
    row: number;
    column: number;
};