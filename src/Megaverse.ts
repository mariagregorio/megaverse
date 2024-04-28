import { DrawService } from 'DrawService';
import { isComposed, threadProcessingPromises } from './utils';
import { ComethDirections, Coords, Elements, ElementsDetails, SoloonColors } from './types';

export class Megaverse {
    private drawService: DrawService;

    constructor(drawService: DrawService) {
        this.drawService = drawService;
    }

    public async drawPOLYanetCross(sizeX: number, sizeY: number, crossSize: number): Promise<void> {
        if (crossSize > sizeX || crossSize > sizeY) {
            throw new Error('Cross size exceeds megaverse size limit');
        } else if (crossSize % 2 === 0) {
            throw new Error('Cross size must be an odd number');
        }

        let leftPointer = Math.ceil((sizeX - crossSize) / 2);
        let rightPointer = leftPointer + crossSize - 1;
        let topPointer = Math.ceil((sizeY - crossSize) / 2);

        const coordsToProcess = [];

        for (let i = 0; i < crossSize; i++) {
            if (leftPointer === rightPointer) {
                coordsToProcess.push({ row: topPointer, column: leftPointer });
            } else {
                coordsToProcess.push({ row: topPointer, column: leftPointer });
                coordsToProcess.push({ row: topPointer, column: rightPointer });
            }
            leftPointer++;
            rightPointer--;
            topPointer++;
        }
        try {
            await threadProcessingPromises(coordsToProcess, this.drawService.drawPOLYanet, 2);
        } catch (e) {
            console.log('Error drawing POLYanet cross', e.message);
        }
    }

    public async drawLogo(): Promise<void> {
        try {
            const goal = await this.drawService.getGoal();
            const rows = goal.goal.length;
            const cols = goal.goal[0].length;
            const elementsToProcess: ElementsDetails = { polyanets: [], soloons: [], comeths: [] };

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    let element = goal.goal[r][c].toLowerCase();
                    let type = null;
                    if (isComposed(element)) {
                        const elements = element.split('_');
                        type = elements[0];
                        element = elements[1];
                    }
                    this.processElement(element, type, { row: r, column: c }, elementsToProcess);
                }
            }
            try {
                console.log("processing polyanets...");
                await threadProcessingPromises(elementsToProcess.polyanets, this.drawService.drawPOLYanet, 2);
                console.log("processing soloons...");
                await threadProcessingPromises(elementsToProcess.soloons, this.drawService.drawSOLoon, 2);
                console.log("processing comeths...");
                await threadProcessingPromises(elementsToProcess.comeths, this.drawService.drawComETH, 2);
            } catch (e) {
                console.log('Error drawing logo', e.message);
            }
        } catch (e) {
            console.log('Error drawing logo', e.message);
        }
    }

    private processElement(
        element: string,
        type: string | null,
        coords: Coords,
        elementsToProcess: ElementsDetails
    ): void {
        switch (element) {
            case Elements.POLYANET:
                elementsToProcess.polyanets.push({ coords });
                break;
            case Elements.SOLOON:
                elementsToProcess.soloons.push({ coords, color: type as SoloonColors});
                break;
            case Elements.COMETH:
                elementsToProcess.comeths.push({ coords, direction: type as ComethDirections});
                break;
            default:
                break;
        }
    }
}

abstract class MegaverseElement {
    private coords: Coords;

    constructor(coords: Coords) {
        this.coords = coords;
    }

    getCoords(): Coords {
        return this.coords;
    }

    setCoords(coords: Coords): void {
        this.coords = coords;
    }

    abstract draw(): void;
}

class Polyanet extends MegaverseElement {
    draw(): void {}
}

class Soloon extends MegaverseElement {
    private color: SoloonColors;

    constructor(coords: Coords, color: SoloonColors) {
        super(coords);
        this.color = color;
    }

    draw(): void {}
}

class Cometh extends MegaverseElement {
    private direction: ComethDirections;

    constructor(coords: Coords, direction: ComethDirections) {
        super(coords);
        this.direction = direction;
    }

    draw(): void {}
}