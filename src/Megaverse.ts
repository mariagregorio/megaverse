import { DrawService } from 'DrawService';
import { isComposed, threadProcessingPromises } from './utils';
import { Coords, Elements, SoloonColors, Directions } from './types';

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

        await threadProcessingPromises(coordsToProcess, this.drawService.drawPOLYanet, 2);
    }

    public async drawLogo(): Promise<void> {
        try {
            // const goal = await this.drawService.getGoal();
            const goal = goalMock;
            const rows = goal.goal.length;
            const cols = goal.goal[0].length;
            const matrix = new Array(rows).fill('🌌').map(() => new Array(cols).fill('🌌'));

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    let element = goal.goal[r][c].toLowerCase();;
                    let type = null;
                    if (isComposed(element)) {
                        const elements = element.split('_');
                        type = elements[0];
                        element = elements[1];
                    }
                    this.drawElement(element, type, { row: r, column: c }, matrix);
                }
            }

            this.drawMatrix(matrix);
        } catch (e) {
            console.log('Error drawing logo', e.message);
        }
    }

    private drawElement(element: string, type: string | null, coords: Coords, matrix: string[][]): void {
        switch (element) {
            case Elements.POLYANET:
                
                matrix[coords.row][coords.column] = '🪐';
                break;
            case Elements.SOLOON:
                switch (type) {
                    case SoloonColors.RED:
                        matrix[coords.row][coords.column] = '🔴';
                        break;
                    case SoloonColors.BLUE:
                        matrix[coords.row][coords.column] = '🔵';
                        break;
                    case SoloonColors.PURPLE:
                        matrix[coords.row][coords.column] = '🟣';
                        break;
                    case SoloonColors.WHITE:
                        matrix[coords.row][coords.column] = '⚪';
                        break;
                    default:
                        break;
                }
                break;
            case Elements.COMETH:
                switch (type) {
                    case Directions.UP:
                        matrix[coords.row][coords.column] = '👆';
                        break;
                    case Directions.DOWN:
                        matrix[coords.row][coords.column] = '👇';
                        break;
                    case Directions.LEFT:
                        matrix[coords.row][coords.column] = '👈';
                        break;
                    case Directions.RIGHT:
                        matrix[coords.row][coords.column] = '👉';
                        break;
                }
                break;
            default:
                break;
        }
    }

    private drawMatrix(matrix: string[][]): void {
        let matrixString = '';
        for (const row of matrix) {
            const rowString = row.join(' ');
            matrixString = matrixString.concat(rowString + '\n');
        }
        console.log(matrixString);
    }
}

const goalMock = {
    goal: [
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'RIGHT_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'UP_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'WHITE_SOLOON',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'LEFT_COMETH',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'BLUE_SOLOON',
            'POLYANET',
            'POLYANET',
            'PURPLE_SOLOON',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'LEFT_COMETH',
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'RIGHT_COMETH',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'WHITE_SOLOON',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'SPACE',
            'DOWN_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'BLUE_SOLOON',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'RED_SOLOON',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'PURPLE_SOLOON',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'WHITE_SOLOON',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'BLUE_SOLOON',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'PURPLE_SOLOON',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'RED_SOLOON',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'UP_COMETH',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'UP_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'PURPLE_SOLOON',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'BLUE_SOLOON',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'POLYANET',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'LEFT_COMETH',
            'SPACE',
            'SPACE',
            'DOWN_COMETH',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'RIGHT_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'WHITE_SOLOON',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'POLYANET',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'BLUE_SOLOON',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'LEFT_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'WHITE_SOLOON',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'RIGHT_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'DOWN_COMETH',
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'BLUE_SOLOON',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'BLUE_SOLOON',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'PURPLE_SOLOON',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'UP_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'PURPLE_SOLOON',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'RED_SOLOON',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'WHITE_SOLOON',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'RIGHT_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'RED_SOLOON',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'WHITE_SOLOON',
            'POLYANET',
            'POLYANET',
            'PURPLE_SOLOON',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'RED_SOLOON',
            'POLYANET',
            'POLYANET',
            'BLUE_SOLOON',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'LEFT_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'SPACE',
            'POLYANET',
            'RED_SOLOON',
            'SPACE',
            'SPACE',
            'DOWN_COMETH',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'POLYANET',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'UP_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'POLYANET',
            'POLYANET',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'DOWN_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'DOWN_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'UP_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'LEFT_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'RIGHT_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'LEFT_COMETH',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
        [
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
            'SPACE',
        ],
    ],
};
