import axios from 'axios';

type RequestBody = {
    candidateId: string;
    row: number;
    column: number;
};

const POLYANET_ENDPOINT = 'https://challenge.crossmint.io/api/polyanets';

export class DrawService {
    public async drawPOLYanet(row: number, column: number): Promise<void> {
        if (!process.env.CANDIDATE_ID) {
            throw new Error('CANDIDATE_ID is not set');
        }
        const body: RequestBody = {
            candidateId: process.env.CANDIDATE_ID,
            row,
            column,
        };

        try {
            console.log(`draw POLYanet at row ${row} and column ${column}...`);
            await axios.post(POLYANET_ENDPOINT, body, {
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (e) {
            throw new Error('Error while sending request to POLYanet endpoint: ' + e);
        }
    }
}
