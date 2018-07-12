import { expect } from "chai"
import * as sinon from "sinon"

import {settingsLoginUser} from "../settings-login-user"
import {settingsUpdateUserState} from "../settings-update-user-state"

describe("settingsLoginUser", () => {
  let dispatch, ipcRenderer, sendStub, onStub

  before(() => {
    dispatch = sinon.stub()
    dispatch.resolves("")
    ipcRenderer = require("electron").ipcRenderer
    sendStub = sinon.stub(ipcRenderer, "send")
    onStub = sinon.stub(ipcRenderer, "on").yields()
  })

  after(() => {
    sendStub.restore()
    onStub.restore()
  })

  it("sends request authorization ipc message to main process", async () => {
    await settingsLoginUser("testURL")(dispatch)
    // eslint-disable-next-line no-unused-expressions
    expect(sendStub.calledWithMatch("requestAuthorization", "testURL")).is.true
  })

  it("dispatches update user state on received authorization", async () => {
    await settingsLoginUser("testURL")(dispatch)
    // eslint-disable-next-line no-unused-expressions
    expect(dispatch.calledWithMatch(settingsUpdateUserState)).is.true
  })
})
