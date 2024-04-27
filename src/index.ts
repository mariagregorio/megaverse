import { DrawService } from "./DrawService";
import { Megaverse } from "./Megaverse";

const drawService = new DrawService();

const megaverse = new Megaverse(11, 11, drawService);
// megaverse.drawCross(7, '🪐');
// megaverse.drawMegaverse();

const run = async () => {
    // await megaverse.drawPOLYanetCross(7);
    console.log(await drawService.getGoal());
}

run()