jest.unmock("../select")

import select from "../select"
import * as actionTypes from "../../actionTypes"

describe("select action", () => {
  it("creates action with correct id", () => {
    expect(select(1)).toEqual({
      type: actionTypes.SELECT,
      id: 1
    })
  })
})
