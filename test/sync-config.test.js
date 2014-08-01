'use strict';

var grunt = require('grunt');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports["sync-config"] = {
    "custom-options": function (test) {
        test.expect(5);

        var actual = grunt.file.readJSON('tmp/dest.json');
        var expected = grunt.file.readJSON('test/files/expected.json');

        test.equal(actual.foo, expected.foo, "should have overwritten 'foo'");
        test.equal(actual.bar, expected.bar, "should have created 'bar'");
        test.equal(actual.baz, expected.baz, "should have created 'baz'");

        test.equal(actual.a, 99, "should not have overwritten 'a'");
        test.equal(actual.b, undefined, "should not have created 'b'");

        test.done();
    }
};
