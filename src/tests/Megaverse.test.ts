import { DrawServiceMock } from './mocks';
import { Megaverse } from '../Megaverse';

describe('Megaverse', () => {
    beforeAll(() => {
        process.env.BATCH_DELAY = '1';
        process.env.CANDIDATE_ID = '123';
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should draw polyanets cross with expected number of requests', async () => {
        const drawService = new DrawServiceMock();
        const spy = jest.spyOn(drawService, 'drawElement');
        const megaverse = new Megaverse(drawService);

        await megaverse.drawPOLYanetCross(11, 11, 7);

        expect(spy).toHaveBeenCalledTimes(13);
    });

    test('should draw logo with expected number of requests', async () => {
        const drawService = new DrawServiceMock();
        const spy = jest.spyOn(drawService, 'drawElement');
        const megaverse = new Megaverse(drawService);
        const goal = await drawService.getGoal();
        const elementCount = goal.goal.length * goal.goal[0].length;

        await megaverse.drawLogo();

        expect(spy).toHaveBeenCalledTimes(elementCount);
    });
});
