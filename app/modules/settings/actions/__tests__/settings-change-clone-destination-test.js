import { expect } from "chai"

import { settingsChangeCloneDestination } from "../settings-change-clone-destination"
import { SETTINGS_CHANGE_CLONE_DESTINATION } from "../../constants"

const NEW_CLONE_DESTINATION = "/tmp/some/path/through/the/filesystem"

describe("settingsChangeCloneDestination", () => {
  it("creates an action with the correct type", () => {
    expect(
      settingsChangeCloneDestination(NEW_CLONE_DESTINATION).type
    ).to.equal(SETTINGS_CHANGE_CLONE_DESTINATION)
  })

  it("creates an action with the correct destination", () => {
    expect(
      settingsChangeCloneDestination(NEW_CLONE_DESTINATION).destination
    ).to.equal(NEW_CLONE_DESTINATION)
  })
})
