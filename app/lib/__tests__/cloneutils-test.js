import { expect } from "chai"
import { clone } from "../cloneutils.js"
import * as sinon from "sinon"
import rmdir from "rimraf"

const fs = require("fs")

const TEST_REPO = "https://github.com/education/classroom-desktop"
const TEST_FAKE_REPO = "https://github.com/education/a-repo-that-will-never-exist"

const DESTINATION = "/tmp/" + Math.random().toString(36).substring(7)

describe("Clone Utilities", () => {
  describe("clone", () => {
    const removeTestDir = (done) => {
      rmdir(DESTINATION, () => {
        done()
      })
    }

    beforeEach(removeTestDir)
    afterEach(removeTestDir)

    it("clones the repository to the correct destination", async () => {
      await clone(
        TEST_REPO,
        DESTINATION,
        () => {}
      )

      const stats = fs.lstatSync(DESTINATION)
      expect(stats.isDirectory()).is.equal(true)
    })

    it("reports progress to the callback during the clone", async () => {
      const callback = sinon.spy()

      await clone(
        TEST_REPO,
        DESTINATION,
        callback
      )

      expect(callback.calledWith(0)).equals(true)
      expect(callback.calledWith(100)).equals(true)
    })

    it("throws an error when cloning a repo that doesn't exist", async () => {
      try {
        await clone(
          TEST_FAKE_REPO,
          DESTINATION,
          () => {}
        )
      } catch (err) {
        return
      }

      throw new Error("Clone when repository doesn't exist should not succeed")
    })

    it("throws an error when cloning a repo to an existing non-empty directory", async () => {
      await clone(
        TEST_REPO,
        DESTINATION,
        () => {}
      )

      try {
        await clone(
          TEST_REPO,
          DESTINATION,
          () => {}
        )
      } catch (err) {
        return
      }

      throw new Error("Clone to existing directory should not succeed")
    })
  })
})
