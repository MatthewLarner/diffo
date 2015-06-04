var sameValue = require('same-value'),
    nothing = {};

function getDifferenceOrNothing(valueA, valueB){
    if(valueB && typeof valueB === 'object' && !(valueB instanceof Date)) {
        if(!valueA || typeof valueA !== 'object') {
            return valueB;
        }

        if(Array.isArray(valueB)) {
            var valueAIsArray = Array.isArray(valueA),
                valueALength = valueA.length,
                valueBLength = valueB.length;

            if (!valueALength && !valueBLength) {
                return nothing;
            }

            if(valueAIsArray) {
                var noDifferance = true,
                    result = [],
                    sameLength = valueALength === valueBLength;

                for (var index = 0; index < valueBLength; index++) {
                    if(sameValue(valueA[index], valueB[index])){
                        result.push(valueB[index]);
                        continue;
                    }

                    var itemResult = getDifferenceOrNothing(valueA[index], valueB[index]);

                    if(itemResult === nothing){
                        result.push(valueB[index]);
                    }else{
                        result.push(itemResult);
                        noDifferance = false;
                    }
                }

                if(noDifferance && sameLength){
                    return nothing;
                }
            }

            return result;
        }

        var diff = getDifference(valueA, valueB);

        if(Object.keys(diff).length) {
            return diff;
        }
        return nothing;
    }

    if(!sameValue(valueA, valueB)) {
        return valueB;
    }

    return nothing;
}

function getDifference(objectA, objectB, missingKeys){
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
            goToNextKey = false,
            itemResult = getDifferenceOrNothing(objectA[key], objectB[key]);

        if(itemResult === nothing){
            continue;
        }

        result[key] = itemResult;
    }

    return result;
};

module.exports = getDifference;