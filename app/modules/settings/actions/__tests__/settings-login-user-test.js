import { expect } from "chai"
import * as sinon from "sinon"

import { settingsLoginUser } from "../settings-login-user"
import { settingsFetchUserFromKeychain } from "../settings-fetch-user-from-keychain"

describe("settingsLoginUser", () => {
  let dispatch, ipcRenderer, sendStub, onStub

  beforeEach(() => {
    dispatch = sinon.stub()
    dispatch.resolves("")
    ipcRenderer = require("electron").ipcRenderer
    sendStub = sinon.stub(ipcRenderer, "send")
    onStub = sinon.stub(ipcRenderer, "on").yields()
  })

  afterEach(() => {
    sendStub.restore()
    onStub.restore()
  })

  it("sends request authorization ipc message to main process", async () => {
    await settingsLoginUser("testURL")(dispatch)

    expect(sendStub.calledWithMatch("requestAuthorization", "testURL")).is.true
  })

  it("dispatches update user state on received authorization", async () => {
    await settingsLoginUser("testURL")(dispatch)

    expect(dispatch.calledWithMatch(settingsFetchUserFromKeychain)).is.true
  })
})
