module.exports = function(objectA, objectB){
    var result = {},
        keys,
        key;

    function getDifference(a, b) {
        keys = Object.keys(a);

        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            if(a[key] !== b[key]) {
                result[key] = a[key];
            }
        }
    }

    getDifference(objectA, objectB);
    getDifference(objectB, objectA);

    return result;
};