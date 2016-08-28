jest.unmock("../setClonePath")

import setClonePath from "../setClonePath"
import * as actionTypes from "../../actionTypes"

describe("setClonePath action", () => {
  const TEST_ID = 1234
  const TEST_PATH = "/some/new/path"

  it("creates action with correct id", () => {
    expect(setClonePath(TEST_ID, TEST_PATH).id).toEqual(TEST_ID)
  })

  it("creates action with correct type", () => {
    expect(setClonePath(TEST_ID, TEST_PATH).type).toEqual(actionTypes.SET_CLONE_PATH)
  })

  it("creates action with correct clonePath", () => {
    expect(setClonePath(TEST_ID, TEST_PATH).clonePath).toEqual(TEST_PATH)
  })
})
