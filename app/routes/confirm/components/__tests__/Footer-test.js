jest.unmock("../Footer.jsx")

import React from "react"
import { shallow } from "enzyme"

import Footer from "../Footer.jsx"

describe("Footer", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Footer />)
  })

  it("has a button for going back", () => {
    expect(wrapper.find(".btn-danger").text()).toEqual("Back")
  })

  it("has a button for starting the archive process", () => {
    expect(wrapper.find(".btn-success").text()).toEqual("Begin Archive")
  })
})
