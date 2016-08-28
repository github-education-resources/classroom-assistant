jest.unmock("../changeCloneDestination.js")

import changeCloneDestination from "../changeCloneDestination.js"
import * as actionTypes from "../../actionTypes"

const NEW_CLONE_DESTINATION = "/tmp/some/path/through/the/filesystem"

describe("changeCloneDestination", () => {
  it("creates an action with the correct type", () => {
    expect(
      changeCloneDestination(NEW_CLONE_DESTINATION).type
    ).toEqual(actionTypes.CHANGE_CLONE_DESTINATION)
  })

  it("creates an action with the correct destination", () => {
    expect(
      changeCloneDestination(NEW_CLONE_DESTINATION).destination
    ).toEqual(NEW_CLONE_DESTINATION)
  })
})
