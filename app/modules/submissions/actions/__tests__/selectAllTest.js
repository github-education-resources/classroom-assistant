jest.unmock("../selectAll")

import selectAll from "../selectAll"
import * as actionTypes from "../../actionTypes"

describe("selectAll action", () => {
  it("creates action to select all", () => {
    expect(selectAll(true)).toEqual({
      type: actionTypes.SELECT_ALL,
      newValue: true
    })
  })

  it("creates action to deselect all", () => {
    expect(selectAll(false)).toEqual({
      type: actionTypes.SELECT_ALL,
      newValue: false
    })
  })
})
