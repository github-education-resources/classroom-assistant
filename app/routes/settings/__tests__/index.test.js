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
    expect(wrapper.find("NavFooter").length).toBe(1)
    expect(wrapper.find("NavFooter").prop("left")).toEqual({
      label: "Back",
      route: "/"
    })
  })
})
