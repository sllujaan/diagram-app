


export const _test = (testName, callback) => {
    try {
        callback();
        console.log(`✓ ${testName}`);
    }
    catch(err) {
        console.error(`✕ ${testName}`);
        console.error(err);
    }
}

export const _expect = (actualValue) => {
    return {
        toBe: (expectedValue) => {
            if(actualValue !== expectedValue) {
                throw new Error(
                    `Expected: ${expectedValue}
                     Received: ${actualValue}
                     `
                );
            }
        }
        ,
        shouldContain: () => {
            
        }
    }
}