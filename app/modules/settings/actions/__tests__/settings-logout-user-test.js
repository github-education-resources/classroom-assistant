import { expect } from "chai"
import * as sinon from "sinon"
import { ipcRenderer } from "electron"

import { settingsLogoutUser } from "../settings-logout-user"
import { settingsSetUsername } from "../settings-set-username"
import { settingsResetState } from "../settings-reset-state"

const { session } = require("electron").remote

describe("settingsLogoutUser", () => {
  let dispatch

  beforeEach(() => {
    dispatch = sinon.stub()
    dispatch.resolves("")
  })

  afterEach(() => {
    dispatch = null
  })

  it("dispatches reset state", async () => {
    await settingsLogoutUser()(dispatch)

    expect(dispatch.calledWithMatch(settingsResetState)).is.true
  })

  it("dispatches set username null", async () => {
    await settingsLogoutUser()(dispatch)

    expect(dispatch.calledWithMatch(settingsSetUsername(null))).is.true
  })

  it("clears session storage", async () => {
    const sessionSpy = sinon.spy()
    session.fromPartition("auth:session").clearStorageData = sessionSpy
    await settingsLogoutUser()(dispatch)

    expect(sessionSpy.calledOnce).is.true
  })

  it("dispatches message to delete token", async () => {
    const ipcStub = sinon.stub(ipcRenderer, "send")
    await settingsLogoutUser()(dispatch)

    expect(ipcStub.calledOnce).is.true
    expect(ipcStub.getCall(0).args[0]).to.eql("deleteToken")

    ipcRenderer.send.restore()
  })
})
