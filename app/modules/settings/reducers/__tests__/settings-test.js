import { expect } from "chai"

import settings from "../settings"
import { SETTINGS_CHANGE_CLONE_DESTINATION } from "../../constants"

const START_DESTINATION = "/tmp/some/path"
const FINAL_DESTINATION = "/tmp/some/other/final/path"

describe("settings reducer", () => {
  it("changes the clone destination", () => {
    const action = {
      type: SETTINGS_CHANGE_CLONE_DESTINATION,
      destination: FINAL_DESTINATION
    }

    const initialState = {
      cloneDestination: START_DESTINATION
    }

    const expectedState = {
      cloneDestination: FINAL_DESTINATION
    }

    expect(settings(initialState, action)).eql(expectedState)
  })
})
