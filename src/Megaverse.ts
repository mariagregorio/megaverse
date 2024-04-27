export class Megaverse {
    private sizeX: number;
    private sizeY: number;
    private megaverseMatrix: string[][];

    constructor(sizeX: number, sizeY: number) {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.megaverseMatrix = new Array(this.sizeY)
            .fill('🌌')
            .map(() => new Array(this.sizeX).fill('🌌'));
    }

    public drawCross(crossSize: number, symbol: string) {
        if (crossSize > this.sizeX || crossSize > this.sizeY) {
            throw new Error('Cross size exceeds megaverse size limit');
        } else if (crossSize % 2 === 0) {
            throw new Error('Cross size must be an odd number');
        }

        let leftPointer = Math.ceil((this.sizeX - crossSize) / 2);
        let rightPointer = leftPointer + crossSize - 1;
        let topPointer = Math.ceil((this.sizeY - crossSize) / 2);

        for (let i = 0; i < crossSize; i++) {
            if (leftPointer < rightPointer) {
                this.megaverseMatrix[topPointer][leftPointer] = symbol;
                this.megaverseMatrix[topPointer][rightPointer] = symbol;
            } else {
                this.megaverseMatrix[topPointer][leftPointer] = symbol;
                if (leftPointer > rightPointer) {
                    this.megaverseMatrix[topPointer][rightPointer] = symbol;
                }
            }
            leftPointer++;
            rightPointer--;
            topPointer++;
        }
    }

    public drawMegaverse() {
        let matrixString = '';
        for (const row of this.megaverseMatrix) {
            const rowString = row.join('  ');
            matrixString = matrixString.concat(rowString + '\n');
        }
        console.log(matrixString);
    }
}
