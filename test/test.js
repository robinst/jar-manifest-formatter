var assert = require('chai').assert;
var format = require('../formatter.js').format;

describe('format', function () {
  it('should handle empty input', function () {
    assert.equal("\n", format("", { formatLists: true }));
  });
  it('should handle simple headers', function () {
    assert.equal("Key: Value\n\n", format("Key: Value", { formatLists: true }));
  });
  it('should put list header values on separate lines', function () {
    assert.equal("Require-Bundle:\n foo\n bar\n baz\n\n", format("Require-Bundle: foo,bar,baz\n", { formatLists: true }));
  });
  it('should trim list header values', function () {
    assert.equal("Require-Bundle:\n foo\n bar\n\n", format("Require-Bundle: foo , bar\n", { formatLists: true }));
  });
  it('should sort list header values', function () {
    assert.equal("Require-Bundle:\n bar\n foo\n\n", format("Require-Bundle: foo,bar\n", { formatLists: true, sortLists: true }));
  });
  it('should sort headers', function () {
    assert.equal("Bar: Bar\nFoo: Foo\n\n", format("Foo: Foo\nBar: Bar\n", { formatLists: true, sortLists: true, sortHeaders: true }));
  });
});
