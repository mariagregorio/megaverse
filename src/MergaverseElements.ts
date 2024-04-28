import { DrawService } from "./DrawService";
import { COMETH_ENDPOINT, POLYANET_ENDPOINT, SOLOON_ENDPOINT } from "./endpoints";
import { ComethDirections, Coords, ElementRequestBody, SoloonColors } from "./types";

export abstract class MegaverseElement {
    protected coords: Coords;
    abstract endpoint: string;
    protected drawService: DrawService

    constructor(coords: Coords, drawService: DrawService) {
        if (!process.env.CANDIDATE_ID) {
            throw new Error('CANDIDATE_ID is not set');
        }
        this.coords = coords;
        this.drawService = drawService;
    }

    getCoords(): Coords {
        return this.coords;
    }

    setCoords(coords: Coords): void {
        this.coords = coords;
    }

    public async draw(): Promise<void> {
        await this.drawService.drawElement(this.endpoint, this.parseRequestBody());
    };

    protected abstract parseRequestBody(): ElementRequestBody;
}

export class Polyanet extends MegaverseElement {
    endpoint: string;
    constructor(coords: Coords, drawService: DrawService) {
        super(coords, drawService);
        this.endpoint = POLYANET_ENDPOINT;
    }

    parseRequestBody(): ElementRequestBody {
        return {
            candidateId: process.env.CANDIDATE_ID,
            row: this.coords.row,
            column: this.coords.column,
        };
    }
}

export class Soloon extends MegaverseElement {
    endpoint: string;
    private color: SoloonColors;
    
    constructor(coords: Coords, color: SoloonColors, drawService: DrawService) {
        super(coords, drawService);
        this.color = color;
        this.endpoint = SOLOON_ENDPOINT;
    }

    public getColor(): SoloonColors {
        return this.color;
    }

    public setColor(color: SoloonColors): void {
        this.color = color;
    }

    protected parseRequestBody(): ElementRequestBody {
        return {
            candidateId: process.env.CANDIDATE_ID,
            row: this.coords.row,
            column: this.coords.column,
            color: this.color
        };
    }
}

export class Cometh extends MegaverseElement {
    endpoint: string;
    private direction: ComethDirections;
    
    constructor(coords: Coords, direction: ComethDirections, drawService: DrawService) {
        super(coords, drawService);
        this.direction = direction;
        this.endpoint = COMETH_ENDPOINT;
    }

    public getDirection(): ComethDirections {
        return this.direction;
    }

    public setDirection(direction: ComethDirections): void {
        this.direction = direction;
    }

    protected parseRequestBody(): ElementRequestBody {
        return {
            candidateId: process.env.CANDIDATE_ID,
            row: this.coords.row,
            column: this.coords.column,
            direction: this.direction
        };
    }
}