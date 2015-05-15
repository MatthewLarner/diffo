var test = require('grape'),
    merge = require('../');


test('Merge', function(t){
    t.plan(11);

    t.equal(merge(null, null), null, 'merge nulls');
    t.equal(merge(undefined, undefined), undefined, 'merge undefineds');
    t.equal(merge(1, 2), 2, 'merge numbers');
    t.equal(merge(true, false), false, 'merge bools');
    t.equal(merge({}, 'string'), 'string', 'merge object with value type');

    t.deepEqual(merge({a:1}, {b:2}), {a:1,b:2}, 'merge simple objects');
    t.deepEqual(merge({a:1}, new Date()), new Date(), 'merge with date source');
    t.deepEqual(merge(new Date(), {a:1}), {a:1}, 'merge with date target');

    t.deepEqual(merge({a:{b:3}}, {a:{c:4}}), {a:{b:3,c:4}}, 'deep merge');
    t.deepEqual(merge({a:{b:3}}, {a:null}), {a:null}, 'deep merge value types');
    t.deepEqual(merge({a:{b:3}}, {a:new Date()}), {a:new Date()}, 'deep merge with dates');
});

test('Clone', function(t){
    t.plan(4);

    var target = {b:2};

    t.deepEqual(merge(target), target, 'Same structure');
    t.notEqual(merge(target), target, 'Different instance');

    var target = new Date();

    t.deepEqual(merge(target), target, 'Same date');
    t.notEqual(merge(target), target, 'Different instance');
});

test('Edge cases', function(t){
    t.plan(2);

    t.equal(merge(), undefined, 'No parameters');

    function Thing(){}
    Thing.prototype.stuff = 5;

    t.deepEqual(merge(new Thing(), {a: 1}), {a:1}, 'prototypical keys');
});