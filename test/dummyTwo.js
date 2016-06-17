/* eslint-env mocha */

const assert = require("chai").assert

describe("objects", () => {
  describe("strings", () => {
    it("should concatenate", () => {
      assert.equal("helloworld", "hello" + "world")
    })
  })
})
