var assert = require('chai').assert;
var format = require('../formatter.js').format;

describe('format', function () {
  it('should handle empty input', function () {
    assert.equal("\n", format("", true, false, false));
  });
  it('should handle simple headers', function () {
    assert.equal("Key: Value\n\n", format("Key: Value", true, false, false));
  });
  it('should put list header values on separate lines', function () {
    assert.equal("Require-Bundle:\n foo\n bar\n baz\n\n", format("Require-Bundle: foo,bar,baz\n", true, false, false));
  });
  it('should trim list header values', function () {
    assert.equal("Require-Bundle:\n foo\n bar\n\n", format("Require-Bundle: foo , bar\n", true, false, false));
  });
  it('should sort list header values', function () {
    assert.equal("Require-Bundle:\n bar\n foo\n\n", format("Require-Bundle: foo,bar\n", true, true, false));
  });
  it('should sort headers', function () {
    assert.equal("Bar: Bar\nFoo: Foo\n\n", format("Foo: Foo\nBar: Bar\n", true, true, true));
  });
});
