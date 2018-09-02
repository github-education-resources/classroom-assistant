import { expect } from "chai"
import * as sinon from "sinon"

import {settingsLogoutUser} from "../settings-logout-user"
import {settingsSetUsername} from "../settings-set-username"
import { settingsResetState } from "../settings-reset-state"

const keytar = require("keytar")
const {session} = require("electron").remote

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

  // TODO: Make this test more specific after keytar config is finalized
  it("calls node keytar delete password", async () => {
    const keytarStub = sinon.stub(keytar, "deletePassword")
    await settingsLogoutUser()(dispatch)

    expect(keytarStub.calledOnce).is.true

    keytar.deletePassword.restore()
  })
})
