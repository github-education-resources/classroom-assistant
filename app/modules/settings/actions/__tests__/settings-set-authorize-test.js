import { expect } from "chai"
import { settingsSetAuthorize } from "../settings-set-authorize"
import { SETTINGS_SET_AUTHORIZE } from "../../constants"

describe("settingsSetAuthorize", () => {
  it("creates action with passed value true", () => {
    expect(settingsSetAuthorize(true)).eql({
      type: SETTINGS_SET_AUTHORIZE,
      payload: true,
    })
  })

  it("creates action with passed value false", () => {
    expect(settingsSetAuthorize(false)).eql({
      type: SETTINGS_SET_AUTHORIZE,
      payload: false,
    })
  })
})
