import { expect } from "chai"
import { clone } from "../cloneutils"
import * as sinon from "sinon"

const fs = require("fs-extra")

const TEST_REPO = "https://github.com/education/classroom-assistant"
const TEST_FAKE_REPO = "https://github.com/education/a-repo-that-will-never-exist"

const DESTINATION = "/tmp/" + Math.random().toString(36).substring(7)

describe("Progress Parser", () => {
  describe("clone", () => {
    const removeTestDir = async () => {
      await fs.remove(DESTINATION)
    }

    const createTestDir = async () => {
      await fs.ensureDir(DESTINATION)
    }

    beforeEach(createTestDir)
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
