var assert = require('chai').assert;

describe('objects', function() {
  describe('strings', function () {
    it('should concatenate', function () {
      assert.equal("helloworld", "hello" + "world");
    });
  });
});
