import { expect } from "chai"
import { settingsSetUsername } from "../settings-set-username"
import { SETTINGS_SET_USERNAME } from "../../constants"

describe("settingsSetAuthorize", () => {
  it("creates action with passed username", () => {
    expect(settingsSetUsername("testUser")).eql({
      type: SETTINGS_SET_USERNAME,
      payload: "testUser",
    })
  })
})
