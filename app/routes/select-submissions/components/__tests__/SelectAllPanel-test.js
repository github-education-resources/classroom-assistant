jest.unmock("../SelectAllPanel.jsx")

import React from "react"
import { shallow } from "enzyme"

import SelectAllPanel from "../SelectAllPanel.jsx"

describe("SelectAllPanel", () => {
  let wrapper

  let testProps = {
    selected: 3,
    total: 10
  }

  beforeEach(() => {
    wrapper = shallow(<SelectAllPanel {...testProps}/>)
  })

  it("has a checkbox for selecting all submissions", () => {
    const checkbox = wrapper.find("input")
    expect(checkbox).toBeDefined()
    expect(checkbox.prop("type")).toEqual("checkbox")
  })

  it("shows the number of selected items and the total number of items", () => {
    expect(wrapper.text().indexOf(`${testProps.selected}/${testProps.total} selected`)).not.toBe(-1)
  })
})
