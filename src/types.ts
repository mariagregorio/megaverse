export type PolyanetRequestBody = {
    candidateId?: string;
    row: number;
    column: number;
};

export enum Elements {
    POLYANET = 'polyanet',
    SOLOON = 'soloon',
    COMETH = 'cometh',
}

export type ElementsDetails = {
    polyanets: {coords: Coords}[],
    soloons: {coords: Coords, color: SoloonColors}[],
    comeths: {coords: Coords, direction: ComethDirections}[],
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

export type SoloonRequestBody = {
    candidateId?: string;
    row: number;
    column: number;
    color: SoloonColors;
}

export type ComethRequestBody = {
    candidateId?: string;
    row: number;
    column: number;
    direction: ComethDirections
}

export type Goal = {
    goal: string[][];
};

export type Coords = {
    row: number;
    column: number;
};