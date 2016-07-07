jest.unmock("../Footer.jsx")

import React from "react"
import { shallow } from "enzyme"

import Footer from "../Footer.jsx"

describe("Footer", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Footer />)
  })

  it("renders a nav div", () => {
    expect(wrapper.find("div.navbar-fixed-bottom").length).toBe(1)
  })

  it("renders an exit button", () => {
    expect(wrapper.find("button.btn").length).toBe(1)
    expect(wrapper.find("button.btn").text()).toEqual("Close")
  })
})
