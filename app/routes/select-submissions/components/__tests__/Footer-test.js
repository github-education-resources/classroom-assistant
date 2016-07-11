jest.unmock("../Footer.jsx")

import React from "react"
import { shallow } from "enzyme"

import Footer from "../Footer.jsx"

describe("Footer", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Footer />)
  })

  it("has a 'cancel' button", () => {
    expect(wrapper.find(".btn-danger").text()).toEqual("Cancel")
  })

  it("has a 'choose destination' button", () => {
    expect(wrapper.find(".btn-success").text()).toEqual("Next: Choose Destination")
  })
})
