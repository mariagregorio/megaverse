export const processPromisesInBatches = async (promises: Promise<void>[], batchSize: number) => {
    for (let i = 0; i < promises.length; i += batchSize) {
        try {
            console.log('process batch...')
            await Promise.all(promises.slice(i, i + batchSize));
        } catch (e) {
            console.error('Error processing promises batch', e);
        }
    }
};
