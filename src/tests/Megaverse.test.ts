import { DrawServiceMock } from './mocks';
import { Megaverse } from '../Megaverse';

describe('Megaverse', () => {
    process.env.CANDIDATE_ID = '123';
    process.env.BATCH_DELAY = '1';
    const drawService = new DrawServiceMock();
    const megaverse = new Megaverse(drawService);

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should draw polyanets cross with expected number of requests', async () => {
        const spy = jest.spyOn(drawService, 'drawElement');

        await megaverse.drawPOLYanetCross(11, 11, 7);

        expect(spy).toHaveBeenCalledTimes(13);
    });

    test('should throw when cross exceeds limit', async () => {
        expect(async () => await megaverse.drawPOLYanetCross(5, 5, 7)).rejects.toThrow(
            'Cross size exceeds megaverse size limit'
        );
    });

    test('should throw when cross size is not odd', async () => {
        expect(async () => await megaverse.drawPOLYanetCross(5, 5, 2)).rejects.toThrow(
            'Cross size must be an odd number'
        );
    });

    test('should draw logo with expected number of requests', async () => {
        const spy = jest.spyOn(drawService, 'drawElement');

        const goal = await drawService.getGoal();
        const elementCount = goal.goal.length * goal.goal[0].length;

        await megaverse.drawLogo();

        expect(spy).toHaveBeenCalledTimes(elementCount);
    });
});
