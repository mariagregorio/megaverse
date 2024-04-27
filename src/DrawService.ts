import axios from 'axios';
import { Coords, Goal, PolyanetRequestBody } from './types';
import { GOAL_ENDPOINT, POLYANET_ENDPOINT } from './endpoints';

export class DrawService {
    public async drawPOLYanet(coords: Coords): Promise<void> {
        if (!process.env.CANDIDATE_ID) {
            throw new Error('CANDIDATE_ID is not set');
        }
        const body: PolyanetRequestBody = {
            candidateId: process.env.CANDIDATE_ID,
            row: coords.row,
            column: coords.column,
        };

        try {
            console.log(`draw POLYanet at row ${coords.row} and column ${coords.column}...`);
            return axios.post(POLYANET_ENDPOINT, body, {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (e) {
            throw new Error('Error while sending request to POLYanet endpoint: ' + e);
        }
    }

    public async getGoal(): Promise<Goal> {
        if (!process.env.CANDIDATE_ID) {
            throw new Error('CANDIDATE_ID is not set');
        }
        try {
            console.log('get goal...');
            const response = await axios.get<Goal>(GOAL_ENDPOINT);
            return response.data;
        } catch (e) {
            throw new Error('Error while sending request to Goal endpoint: ' + e);
        }
    }
}
