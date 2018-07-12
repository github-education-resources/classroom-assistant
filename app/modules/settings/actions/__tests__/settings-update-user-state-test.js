import { expect } from "chai"
import * as sinon from "sinon"

import {settingsUpdateUserState} from "../settings-update-user-state"
import { settingsSetUsername } from "../settings-set-username"
const {session} = require("electron").remote

describe("settingsUpdateUserState", () => {
  let dispatchStub, cookieStub

  const sampleCookie = {
    value: "TestUsername"
  }

  beforeEach(() => {
    dispatchStub = sinon.stub()
    dispatchStub.resolves("")
    cookieStub = sinon.stub()
    session.defaultSession.cookies.get = cookieStub
  })

  afterEach(() => {
    dispatchStub.reset()
    cookieStub.reset()
  })

  context("Cookie is found", () => {
    it("sets username to null if there is an error", async () => {
      cookieStub.yields(true, [sampleCookie]) // Error set to true
      await settingsUpdateUserState()(dispatchStub)
      // eslint-disable-next-line no-unused-expressions
      expect(dispatchStub.calledWithMatch(settingsSetUsername(null))).is.true
    })

    it("sets username to value of first cookie if there is no error", async () => {
      cookieStub.yields(false, [sampleCookie]) // Error set to false
      await settingsUpdateUserState()(dispatchStub)
      // eslint-disable-next-line no-unused-expressions
      expect(dispatchStub.calledWithMatch(settingsSetUsername("TestUsername"))).is.true
    })
  })

  context("No cookie in session", () => {
    it("sets username to null", async () => {
      cookieStub.yields(false, [])
      await settingsUpdateUserState()(dispatchStub)
      // eslint-disable-next-line no-unused-expressions
      expect(dispatchStub.calledWithMatch(settingsSetUsername(null))).is.true
    })
  })
})
