export const transactionDone = async () => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            // if (email === 'test@test.com' && password === 'password') {
            if (1 === 1) {
                resolve();
            } else {
                reject();
            }
        }, 1000);
    });
};
