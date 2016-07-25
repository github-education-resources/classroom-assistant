jest.unmock("../index.jsx")

import React from "react"
import { shallow } from "enzyme"

import SettingsPage from "../index.jsx"

describe("SettingsPage", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<SettingsPage />)
  })

  it("renders a footer with a back button", () => {
    expect(wrapper.find("Footer").length).toBe(1)
    expect(wrapper.find("Footer").prop("left")).toEqual({
      label: "Back",
      route: "/"
    })
  })
})
