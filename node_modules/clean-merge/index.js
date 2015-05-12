function isValueLike(value){
    return value == null || typeof value !== 'object' || value instanceof Date;
}

function valueClone(value){
    return value instanceof Date ? new Date(value) : value;
}

function cleanMerge(target, source){

    var isClone = arguments.length === 1;

    if(isClone){
        if(isValueLike(target)){
            return valueClone(target);
        }
    }else{
        if(isValueLike(target)){
            return cleanMerge(source);
        }
        if(isValueLike(source)){
            return valueClone(source);
        }
    }

    var result = Array.isArray(target) ? [] : {},
        keys = Object.keys(target).concat(source && typeof source === 'object' ? Object.keys(source) : []);

    for(var i = 0; i < keys.length; i++){
        var key = keys[i];

        if(!(key in target)){
            result[key] = cleanMerge(source[key]);
            continue;
        }

        if(isClone || !(key in source)){
            result[key] = cleanMerge(target[key]);
            continue;
        }

        result[key] = cleanMerge(target[key], source[key]);
    }


    return result;
}

module.exports = cleanMerge;