var sameValue = require('same-value');

function isObject(object) {
    return (object === Object(object) && (!Array.isArray(object)));
}

module.exports = function getDifference(objectA, objectB, missingKeys){
    if(objectA == null) {
        return objectB;
    }
    var result = Array.isArray(objectB) ? [] : {},
        keys = Object.keys(objectB);

    if(missingKeys) {
        keys = Object.keys(objectA).concat(keys);
    }

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i],
            valueA = objectA[key],
            valueB = objectB[key],
            goToNextKey = false;

        if(valueB && typeof valueB === 'object' && !(valueB instanceof Date)) {
            if(!valueA || typeof valueA !== 'object') {
                result[key] = valueB;
                continue;
            }

            if(Array.isArray(valueB)) {
                var valueAIsArray = Array.isArray(valueA),
                    valueALength = valueA.length,
                    valueBLength = valueB.length;

                if (!valueALength && !valueBLength) {
                    continue;
                }

                if(valueAIsArray) {
                    for (var index = 0; index < (Math.max(valueALength, valueBLength)); index++) {
                        if(!sameValue(valueA[index], valueB[index])) {
                            result[key] = valueB;
                            goToNextKey = true;
                            break;
                        }
                    }
                }
            }

            if(goToNextKey) {
                continue;
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