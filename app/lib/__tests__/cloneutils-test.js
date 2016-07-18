jest.unmock("../cloneutils.js")

import { clone } from "../cloneutils.js"
import rmdir from "rimraf"
import sinon from "sinon"

const fs = require("fs")

const TEST_REPO = "https://github.com/education/classroom-desktop"
const DESTINATION = "/tmp/" + Math.random().toString(36).substring(7)

describe("Clone Utilities", () => {
  describe("clone", () => {
    it("clones the repository", (done) => {
      rmdir(DESTINATION, () => {
        clone(
          TEST_REPO,
          DESTINATION,
          (percentage) => {}
        ).then(() => {
          const stats = fs.lstatSync(DESTINATION)
          expect(stats.isDirectory()).toBe(true)
          rmdir(DESTINATION, () => {
            done()
          })
        })
      })
    })

    it("notifies when the repo is 0% downloaded", (done) => {
      rmdir(DESTINATION, () => {
        var statusCallback = sinon.spy()

        clone(
          TEST_REPO,
          DESTINATION,
          statusCallback
        ).then(() => {
          expect(statusCallback.calledWith(0)).toBe(true)
          rmdir(DESTINATION, () => {
            done()
          })
        })
      })
    })

    it("notifies when the repo is 100% downloaded", (done) => {
      rmdir(DESTINATION, () => {
        var statusCallback = sinon.spy()

        clone(
          TEST_REPO,
          DESTINATION,
          statusCallback
        ).then(() => {
          expect(statusCallback.calledWith(100)).toBe(true)
          rmdir(DESTINATION, () => {
            done()
          })
        })
      })
    })
  })
})
