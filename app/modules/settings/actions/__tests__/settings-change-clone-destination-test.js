jest.unmock("../settings-change-clone-destination.js")

import { settingsChangeCloneDestination } from "../settings-change-clone-destination.js"
import { SETTINGS_CHANGE_CLONE_DESTINATION } from "../../constants.js"

const NEW_CLONE_DESTINATION = "/tmp/some/path/through/the/filesystem"

describe("settingsChangeCloneDestination", () => {
  it("creates an action with the correct type", () => {
    expect(
      settingsChangeCloneDestination(NEW_CLONE_DESTINATION).type
    ).toEqual(SETTINGS_CHANGE_CLONE_DESTINATION)
  })

  it("creates an action with the correct destination", () => {
    expect(
      settingsChangeCloneDestination(NEW_CLONE_DESTINATION).destination
    ).toEqual(NEW_CLONE_DESTINATION)
  })

  it("creates an action with the correct destination")
})
