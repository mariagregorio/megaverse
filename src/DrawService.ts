import axios from 'axios';
import {
    Coords,
    ComethDirections,
    Goal,
    PolyanetRequestBody,
    SoloonColors,
    SoloonRequestBody,
    ComethRequestBody,
} from './types';
import { COMETH_ENDPOINT, GOAL_ENDPOINT, POLYANET_ENDPOINT, SOLOON_ENDPOINT } from './endpoints';

export class DrawService {
    constructor() {
        if (!process.env.CANDIDATE_ID) {
            throw new Error('CANDIDATE_ID is not set');
        }
    }

    public async drawPOLYanet(reqData: { coords: Coords }): Promise<void> {
        const body: PolyanetRequestBody = {
            candidateId: process.env.CANDIDATE_ID,
            row: reqData.coords.row,
            column: reqData.coords.column,
        };

        try {
            console.log(
                `draw POLYanet at row ${reqData.coords.row} and column ${reqData.coords.column}...`
            );
            return axios.post(POLYANET_ENDPOINT, body, {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (e) {
            throw new Error('Error while sending request to POLYanet endpoint: ' + e.message);
        }
    }

    public async drawSOLoon(reqData: { coords: Coords; color: SoloonColors }): Promise<void> {
        const body: SoloonRequestBody = {
            candidateId: process.env.CANDIDATE_ID,
            row: reqData.coords.row,
            column: reqData.coords.column,
            color: reqData.color,
        };

        try {
            console.log(
                `draw ${reqData.color} SOLoon at row ${reqData.coords.row} and column ${reqData.coords.column}...`
            );
            return axios.post(SOLOON_ENDPOINT, body, {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (e) {
            throw new Error('Error while sending request to SOLoon endpoint: ' + e.message);
        }
    }

    public async drawComETH(reqData: {
        coords: Coords;
        direction: ComethDirections;
    }): Promise<void> {
        const body: ComethRequestBody = {
            candidateId: process.env.CANDIDATE_ID,
            row: reqData.coords.row,
            column: reqData.coords.column,
            direction: reqData.direction,
        };

        try {
            console.log(
                `draw ${reqData.direction} comETH at row ${reqData.coords.row} and column ${reqData.coords.column}...`
            );
            return axios.post(COMETH_ENDPOINT, body, {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (e) {
            throw new Error('Error while sending request to comETH endpoint: ' + e.message);
        }
    }

    public async getGoal(): Promise<Goal> {
        try {
            console.log('get goal...');
            const response = await axios.get<Goal>(GOAL_ENDPOINT);
            return response.data;
        } catch (e) {
            throw new Error('Error while sending request to Goal endpoint: ' + e.message);
        }
    }
}
