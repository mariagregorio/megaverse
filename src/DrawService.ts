import axios from 'axios';
import { ElementRequestBody, Goal } from './types';
import { GOAL_ENDPOINT } from './endpoints';

export class DrawService {
    constructor() {
        if (!process.env.CANDIDATE_ID) {
            throw new Error('CANDIDATE_ID is not set');
        }
    }

    public drawElement(endpoint: string, requestBody: ElementRequestBody): Promise<void> {
        try {
            return axios.post(endpoint, requestBody, {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (e) {
            throw new Error('Error while sending request to endpoint: ' + e.message);
        }
    }

    public async getGoal(): Promise<Goal> {
        try {
            const response = await axios.get<Goal>(GOAL_ENDPOINT);
            return response.data;

        } catch (e) {
            throw new Error('Error while sending request to Goal endpoint: ' + e.message);
        }
    }
}
