import { DrawService } from 'DrawService';
import { isComposed } from './utils';
import { ComethDirections, Coords, Elements, ElementsDetails, Goal, SoloonColors } from './types';
import { Cometh, MegaverseElement, Polyanet, Soloon } from './MergaverseElements';
import { setTimeout } from "timers/promises";

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

        const polyanetsToProcess = [];

        for (let i = 0; i < crossSize; i++) {
            if (leftPointer === rightPointer) {
                polyanetsToProcess.push(new Polyanet({ row: topPointer, column: leftPointer }, this.drawService));
            } else {
                polyanetsToProcess.push(new Polyanet({ row: topPointer, column: leftPointer }, this.drawService));
                polyanetsToProcess.push(new Polyanet({ row: topPointer, column: rightPointer }, this.drawService));
            }
            leftPointer++;
            rightPointer--;
            topPointer++;
        }
        try {
            await this.drawBatchesOfMegaverseElements(polyanetsToProcess, 2);
        } catch (e) {
            console.log('Error drawing POLYanet cross', e.message);
        }
    }

    public async drawLogo(): Promise<void> {
        try {
            const goal: Goal = await this.drawService.getGoal();
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
                for (const elements of Object.entries(elementsToProcess)) {
                    await this.drawBatchesOfMegaverseElements(elements[1], 2);
                }
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
                const polyanet = new Polyanet(coords, this.drawService);
                elementsToProcess.polyanets.push(polyanet);
                break;
            case Elements.SOLOON:
                const soloon = new Soloon(coords, type as SoloonColors, this.drawService);
                elementsToProcess.soloons.push(soloon);
                break;
            case Elements.COMETH:
                const cometh = new Cometh(coords, type as ComethDirections, this.drawService);
                elementsToProcess.comeths.push(cometh);
                break;
            default:
                break;
        }
    }

    private async drawBatchesOfMegaverseElements(
        elements: MegaverseElement[],
        batchSize: number,
    ) {
        while (elements.length > 0) {
            const batch = elements.splice(0, batchSize);
            try {
                await setTimeout(Number(process.env.BATCH_DELAY) || 500);
                await Promise.all(batch.map((el) => el.draw()));
            } catch (e) {
                throw new Error('Error while processing batch: ' + e.message);
            }
        }
    };
}