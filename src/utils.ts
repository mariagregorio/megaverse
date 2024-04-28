import { setTimeout } from "timers/promises";

export const threadProcessingPromises = async (
    elements: any[],
    callback: (e: any) => void,
    batchSize: number,
    delay = 500
) => {
    while (elements.length > 0) {
        console.log('processing batch...');
        const batch = elements.splice(0, batchSize);
        try {
            await setTimeout(delay);
            await Promise.all(batch.map(callback));
        } catch (e) {
            throw new Error('Error while processing batch: ' + e.message);
        }
    }
};

export const isComposed = (str: string) => {
    return str.includes('_');
};
