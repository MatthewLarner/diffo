var test = require('tape'),
    diffy = require('../');

test('Simple object', function(t){
    var a = {
            foo: 'bar'
        },
        b = {
            foo: 'bar',
            bar: 'foo'
        },
        expectedOutput = {
            bar: 'foo'
        };

    t.plan(1);

    var result = diffy(a, b);

    t.deepEqual(result, expectedOutput);
});

test('Deep object', function(t){
    var a = {
            foo: 'bar',
            bar: 'foo',
            b: {
                a: 1,
                b: 2
            }
        },
        b = {
            foo: 'bar'
        },
        expectedOutput = {};

    t.plan(1);

    var result = diffy(a, b);

    t.deepEqual(result, expectedOutput);
});

test('Deep object with same keys only one value different', function(t){
    var a = {
            foo: 'bar',
            bar: 'foo',
            b: {
                a: 2,
                b: 2
            }
        },
        b = {
            foo: 'bar',
            b: {
                a: 1,
                b: 2
            }
        },
        expectedOutput = {
            b: {
                a: 1
            }
        };

    t.plan(1);

    var result = diffy(a, b);

    t.deepEqual(result, expectedOutput);
});

test('Deep object with same keys only one value different and additional keys', function(t){
    var a = {
            foo: 'bar',
            bar: 'foo',
            b: {
                a: 2,
                b: 2
            },
            c: {
                a: 1
            }
        },
        b = {
            foo: 'bar',
            b: {
                a: 1,
                b: 2
            },
            d: {
                a: 1
            }
        },
        expectedOutput = {
            b: {
                a: 1
            },
            d:{
                a: 1
            }
        };

    t.plan(1);

    var result = diffy(a, b);

    t.deepEqual(result, expectedOutput);
});

test('Deeper object', function(t){
    var a = {
            foo: 'bar',
            bar: 'foo',
            b: {
                a: 2,
                b: 2
            },
            c: {
                a: 1
            },
            d: {
                e: {
                    a: 1
                }
            }
        },
        b = {
            foo: 'bar',
            b: {
                a: 1,
                b: 2
            },
            d: {
                a: 1
            },
            e: {
                a: 1
            }
        },
        expectedOutput = {
            b: {
                a: 1
            },
            d:{
                a: 1
            },
            e: {
                a: 1
            }
        };

    t.plan(1);

    var result = diffy(a, b);

    t.deepEqual(result, expectedOutput);
});

test('Array values', function(t){
    t.plan(1);

    var a = {
            x: 1
        },
        b = {
            x: 1,
            y: [1,2,3,4]
        },
        expectedOutput = {
            y: [1,2,3,4]
        };

    t.deepEqual(diffy(a, b), expectedOutput);
});

test('Array same key, values in different order', function(t){
    t.plan(1);

    var a = {
            x: 1,
            y: [4,3,2,1]
        },
        b = {
            a: 1,
            y: [1,2,3,4]
        },
        expectedOutput = {
            a: 1,
            y: [1,2,3,4]
        };

    t.deepEqual(diffy(a, b), expectedOutput);
});

test('Pass null for object a results in object b', function(t){
    t.plan(1);

    var b = {a:1},
        expectedOutput = b;

    t.equal(diffy(null, b), expectedOutput);
});

test('Array same key of same length differnt values', function(t){
    t.plan(1);

    var a = {
            x: 1,
            y: [1,2,4,3]
        },
        b = {
            a: 1,
            y: [1,2,3,4]
        },
        expectedOutput = {
            a: 1,
            y: [1,2,3,4]
        };

    t.deepEqual(diffy(a, b), expectedOutput);
});

test('Array same key of different length', function(t){
    t.plan(1);

    var a = {
            x: 1,
            y: [1,2,3,4,5]
        },
        b = {
            a: 1,
            y: [1,2,3,4]
        },
        expectedOutput = {
            a: 1,
            y: [1,2,3,4]
        };

    t.deepEqual(diffy(a, b), expectedOutput);
});

test('Object A same key not an array', function(t){
    t.plan(1);

    var a = {
            x: 1,
            y: 2
        },
        b = {
            a:1,
            y: [1,2,3,4]
        },
        expectedOutput = {
            a: 1,
            y: [1,2,3,4]
        };

    t.deepEqual(diffy(a, b), expectedOutput);
});

test('Array same key of different length', function(t){
    t.plan(1);

    var a = {
            x:1,
            y: [
                1,
                {
                    a:1,
                    b:2
                },
                3,
                4
            ]
        },
        b = {
            a:1,
            y: [
                1,
                {
                    a:1,
                    b:1
                },
                3,
                4
            ]
        },
        expectedOutput = {
            a: 1,
            y: [
                1,
                {
                    b:1
                },
                3,
                4
            ]
        };

    t.deepEqual(diffy(a, b), expectedOutput);
});

test('Empty arrays are treated as no change', function(t){
    t.plan(1);

    var a = {
            a:2,
            x: []
        },
        b = {
            a: 1,
            x: []
        },
        expectedOutput = {
            a: 1
        };

    t.deepEqual(diffy(a, b), expectedOutput);
});