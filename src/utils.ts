export const threadProcessingPromises = async (
    elements: any[],
    callback: (e: any) => void,
    batchSize: number
) => {
    while (elements.length > 0) {
        console.log('processing batch...');
        const batch = elements.splice(0, batchSize);
        try {
            await Promise.all(batch.map(callback));
        } catch (e) {
            throw new Error('Error while processing batch: ' + e.message);
        }
    }
};
