jest.unmock("../SelectAllPanel.jsx")

import React from "react"
import sinon from "sinon"
import { shallow } from "enzyme"

import SelectAllPanel from "../SelectAllPanel.jsx"

describe("SelectAllPanel", () => {
  let testProps = {
    selected: 3,
    total: 10,
    selectAll: true
  }

  describe("visual elements", () => {
    let wrapper

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

  it("calls handler function with false when the checkbox is unchecked by user", () => {
    let handler = sinon.spy()
    let wrapper = shallow(<SelectAllPanel {...testProps} onSelectAllChange={handler} />)
    wrapper.find("input").simulate("click")

    expect(handler.calledWith(false)).toBe(true)
  })

  it("calls handler function with true when the checkbox is checked by user", () => {
    let testPropsChecked = {
      selected: 3,
      total: 10,
      selectAll: false
    }

    let handler = sinon.spy()
    let wrapper = shallow(<SelectAllPanel {...testPropsChecked} onSelectAllChange={handler} />)
    wrapper.find("input").simulate("click")

    expect(handler.calledWith(true)).toBe(true)
  })
})
