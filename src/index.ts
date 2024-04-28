import { DrawService } from './DrawService';
import { Megaverse } from './Megaverse';

const drawService = new DrawService();

const megaverse = new Megaverse(drawService);

console.log('Parkour to the moon!');

const run = async () => {
    // PHASE 1
    // await megaverse.drawPOLYanetCross(11, 11, 7);

    // PHASE 2
    // await megaverse.drawLogo();
};

run();
