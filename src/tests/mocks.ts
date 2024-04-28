import { DrawService } from '../DrawService';
import { ElementRequestBody, Goal } from '../types';

export class DrawServiceMock extends DrawService {
    public drawElement(_endpoint: string, _requestBody: ElementRequestBody): Promise<void> {
        try {
            return new Promise((res) => {
                res();
            });
        } catch (e) {
            throw new Error('Error while sending request to endpoint: ' + e.message);
        }
    }

    public async getGoal(): Promise<Goal> {
        return {
            goal: [
                ['RED_SOLOON', 'POLYANET', 'POLYANET', 'POLYANET', 'POLYANET', 'POLYANET'],
                ['POLYANET', 'UP_COMETH', 'POLYANET', 'POLYANET', 'POLYANET', 'POLYANET'],
                ['POLYANET', 'POLYANET', 'POLYANET', 'POLYANET', 'WHITE_SOLOON', 'POLYANET'],
                ['POLYANET', 'LEFT_COMETH', 'POLYANET', 'POLYANET', 'POLYANET', 'POLYANET'],
                ['POLYANET', 'POLYANET', 'POLYANET', 'POLYANET', 'BLUE_SOLOON', 'POLYANET'],
                ['POLYANET', 'POLYANET', 'POLYANET', 'POLYANET', 'POLYANET', 'POLYANET'],
            ],
        };
    }
}
