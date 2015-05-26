var sameValue = require('same-value');

module.exports = function getDifference(objectA, objectB, missingKeys){
    if(objectA == null) {
        return objectB;
    }

    var result = {},
        keys = Object.keys(objectB);

    if(missingKeys) {
        keys = Object.keys(objectA).concat(keys);
    }

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i],
            valueA = objectA[key],
            valueB = objectB[key];

        if(valueB && typeof valueB === 'object') {
            if(!valueA || typeof valueA !== 'object') {
                result[key] = valueB;
                continue;
            }

            if(Array.isArray(valueB)) {
                if(Array.isArray(valueA) && (valueA.length !== valueB.length)) {
                    result[key] = valueB;
                    continue;
                }

                for (var index = 0; index < valueB.length; index++) {
                    result[key] = [];
                    result[key].push(valueB[i]);
                    continue;
                }
            }

            var diff = getDifference(valueA, valueB);

            if(Object.keys(diff).length) {
                result[key] = diff;
            }
            continue;
        }

        if(!sameValue(valueA, valueB)) {
            result[key] = valueB;
        }
    }

    return result;
};