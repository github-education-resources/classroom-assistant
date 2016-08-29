jest.unmock("../reducer.js")

import reducer from "../reducer.js"
import * as actionTypes from "../actionTypes"

const START_DESTINATION = "/tmp/some/path"
const FINAL_DESTINATION = "/tmp/some/other/final/path"

describe("Settings Reducer", () => {
  it("changes the clone destination", () => {
    const action = {
      type: actionTypes.CHANGE_CLONE_DESTINATION,
      destination: FINAL_DESTINATION
    }

    const initialState = {
      cloneDestination: START_DESTINATION
    }

    const expectedState = {
      cloneDestination: FINAL_DESTINATION
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})
