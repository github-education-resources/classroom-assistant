/* eslint-env mocha */

import { assert } from "chai"
import submissions from "../app/modules/submissions/reducers/submissions"

describe("reducers", () => {
  describe("submissions reducer", () => {
    it("should return the initial state", () => {
      let expectedState = [
        {
          id: 1,
          username: "nicktikhonov",
          displayName: "Nick Tikhonov",
          avatarUrl: "https://avatars.githubusercontent.com/u/6755555?v=3&size=96",
          repoUrl: "https://github.com/education/classroom-desktop",
          selected: true
        }, {
          id: 2,
          username: "nicktikhonov",
          displayName: "Nick Tikhonov",
          avatarUrl: "https://avatars.githubusercontent.com/u/6755555?v=3&size=96",
          repoUrl: "https://github.com/education/classroom-desktop",
          selected: true
        }, {
          id: 3,
          username: "nicktikhonov",
          displayName: "Nick Tikhonov",
          avatarUrl: "https://avatars.githubusercontent.com/u/6755555?v=3&size=96",
          repoUrl: "https://github.com/education/classroom-desktop",
          selected: true
        }
      ]

      assert.deepEqual(
        expectedState,
        submissions(undefined, {})
      )
    })
  })
})
