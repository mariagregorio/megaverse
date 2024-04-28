import { DrawService } from '../DrawService';

describe('DrawService', () => {
    test('should throw when no candidate id var is provided', () => {
        expect(() => new DrawService()).toThrow('CANDIDATE_ID is not set');
    });
});
