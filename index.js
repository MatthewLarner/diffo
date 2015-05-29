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
        keys = Object.keys(objectA).concat(keys);


    if(missingKeys) {
        keys = Object.keys(objectA).concat(keys);
    }

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i],
            valueA = objectA[key],
            valueB = objectB[key],
            goToNextKey = false;

        if(valueB && typeof valueB === 'object') {
            if(!valueA || typeof valueA !== 'object') {
                result[key] = valueB;
                continue;
            }

            // if(Array.isArray(valueB)) {
            //     var valueAIsArray = Array.isArray(valueA),
            //         valueBIsArray = Array.isArray(valueB),
            //         valueALength = valueA.length,
            //         valueBLength = valueB.length;

            //     if(valueAIsArray) {
            //         result[key] = [];
            //         for (var index = 0; index < (Math.max(valueALength, valueBLength)); index++) {
            //             if(!sameValue(valueA[index], valueB[index])) {
            //                 result[key] = valueB;
            //                 goToNextKey = true;
            //                 break;
            //                 // console.log('valueB', valueB[index]);
            //                 // if(!valueB[index]) {
            //                     // break;
            //                 // }
            //                 // result[key][index] = getDifference(valueA, valueB);
            //             } else {

            //                 // result[key][index] = valueB[index];
            //             }
            //         }
            //     }
            // }

            // if(goToNextKey) {
            //     continue;
            // }
            var nextIndex = i + 1;

            if(Array.isArray(valueB) && valueA[nextIndex] && !isObject(valueB) && !isObject(valueB[i])) {
                result[key] = valueB;
            } else {
                var diff = getDifference(valueA, valueB);

                if(Object.keys(diff).length) {
                    if(Array.isArray(valueB)){
                        if(!Array.isArray(result[key])) {
                            result[key] = [];
                        }
                        result[key][i] = valueB[i];
                    } else {
                        result[key] = diff;

                    }
                }
            }
            continue;
        }

        if(!sameValue(valueA, valueB) && valueB) {
            result[key] = valueB;
            // console.log(key, result, isObject(result));
            if(isObject(result[key])) {
                result[key] = result;
            }
        } else if(Array.isArray(valueB)){
            console.log('asdfasaaaaakjdfkjdfjkdfjkdfkjd')
            result[key][i] =valueB[i];
        }
    }

    return result;
};