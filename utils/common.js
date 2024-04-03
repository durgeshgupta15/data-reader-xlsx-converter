const findDifferences = (obj1, obj2) => {
    const differencesObj1 = {};
    const differencesObj2 = {};

    function compareObjects(obj1, obj2, path) {
        // Compare keys of obj1 with obj2
        for (const key in obj1) {
            if (obj1.hasOwnProperty(key)) {
                const newPath = path ? `${path}.${key}` : key;

                if (!obj2.hasOwnProperty(key)) {
                    differencesObj2[newPath] = obj1[key];
                } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                    compareObjects(obj1[key], obj2[key], newPath);
                } else if (obj1[key] !== obj2[key]) {
                    differencesObj2[newPath] = obj1[key];
                }
            }
        }

        // Compare keys of obj2 with obj1
        for (const key in obj2) {
            if (obj2.hasOwnProperty(key)) {
                const newPath = path ? `${path}.${key}` : key;

                if (!obj1.hasOwnProperty(key)) {
                    differencesObj1[newPath] = obj2[key];
                } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                    compareObjects(obj1[key], obj2[key], newPath);
                } else if (obj1[key] !== obj2[key]) {
                    differencesObj1[newPath] = obj2[key];
                }
            }
        }
    }

    compareObjects(obj1, obj2, '');

    return {
        differencesObj1,
        differencesObj2
    };
}

module.exports = {
    findDifferences
};