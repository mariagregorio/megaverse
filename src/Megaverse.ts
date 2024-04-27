import { DrawService } from 'DrawService';
import { threadProcessingPromises } from './utils';

export class Megaverse {
    private sizeX: number;
    private sizeY: number;
    private megaverseMatrix: string[][];
    private drawService: DrawService;

    constructor(sizeX: number, sizeY: number, drawService: DrawService) {
        this.drawService = drawService;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.megaverseMatrix = new Array(this.sizeY)
            .fill('🌌')
            .map(() => new Array(this.sizeX).fill('🌌'));
    }

    public async drawPOLYanetCross(crossSize: number): Promise<void> {
        if (crossSize > this.sizeX || crossSize > this.sizeY) {
            throw new Error('Cross size exceeds megaverse size limit');
        } else if (crossSize % 2 === 0) {
            throw new Error('Cross size must be an odd number');
        }

        let leftPointer = Math.ceil((this.sizeX - crossSize) / 2);
        let rightPointer = leftPointer + crossSize - 1;
        let topPointer = Math.ceil((this.sizeY - crossSize) / 2);

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

        await threadProcessingPromises(coordsToProcess, this.drawService.drawPOLYanet, 2);
    }

    public drawMegaverse(): void {
        let matrixString = '';
        for (const row of this.megaverseMatrix) {
            const rowString = row.join('  ');
            matrixString = matrixString.concat(rowString + '\n');
        }
        console.log(matrixString);
    }
}
