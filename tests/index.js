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

test('Deeper object', function(t){
    var a = {
            foo: 'bar',
            bar: 'foo',
            b: {
                a:1,
                b:2
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

test('More deeper', function(t){
    var a = {
            foo: 'bar',
            bar: 'foo',
            b: {
                a:2,
                b:2
            }
        },
        b = {
            foo: 'bar',
            b: {
                a:1,
                b:2
            }
        },
        expectedOutput = {
            b: {
                a:1
            }
        };

    t.plan(1);

    var result = diffy(a, b);

    t.deepEqual(result, expectedOutput);
});

test('More deeper', function(t){
    var a = {
            foo: 'bar',
            bar: 'foo',
            b: {
                a:2,
                b:2
            },
            c: {
                a:1
            }
        },
        b = {
            foo: 'bar',
            b: {
                a:1,
                b:2
            },
            d: {
                a:1
            }
        },
        expectedOutput = {
            b: {
                a:1
            },
            d:{
                a:1
            }
        };

    t.plan(1);

    var result = diffy(a, b);

    t.deepEqual(result, expectedOutput);
});

test('recursive', function(t){
    var a = {
            foo: 'bar',
            bar: 'foo',
            b: {
                a:2,
                b:2
            },
            c: {
                a:1
            },
            d: {
                e: {
                    a:1
                }
            }
        },
        b = {
            foo: 'bar',
            b: {
                a:1,
                b:2
            },
            d: {
                a:1
            },
            e: {
                a:1
            }
        },
        expectedOutput = {
            b: {
                a:1
            },
            d:{
                a:1
            },
            e: {
                a:1
            }
        };

    t.plan(1);

    var result = diffy(a, b);

    t.deepEqual(result, expectedOutput);
});

test('pass null', function(t){
    t.plan(1);

    var b = {a:1},
        expectedOutput = b;

    t.equal(diffy(null, b), expectedOutput);
});