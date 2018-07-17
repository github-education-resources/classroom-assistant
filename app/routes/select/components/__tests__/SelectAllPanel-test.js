import { expect } from "chai"
import * as sinon from "sinon"

import React from "react"
import { shallow } from "enzyme"

import SelectAllPanel from "../SelectAllPanel"

describe("SelectAllPanel", () => {
  const testProps = {
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

      expect(checkbox).to.not.be.null
      expect(checkbox.prop("type")).to.equal("checkbox")
    })

    it("shows the number of selected items and the total number of items", () => {
      expect(wrapper.text().indexOf(`${testProps.selected}/${testProps.total} selected`)).does.not.equal(-1)
    })
  })

  it("calls handler function with false when the checkbox is unchecked by user", () => {
    const handler = sinon.spy()
    const wrapper = shallow(<SelectAllPanel {...testProps} onSelectAllChange={handler} />)
    wrapper.find("input").simulate("change")

    expect(handler.callCount).to.equal(1)
    expect(handler.calledWith(false)).to.equal(true)
  })

  it("calls handler function with true when the checkbox is checked by user", () => {
    const testPropsChecked = {
      selected: 3,
      total: 10,
      selectAll: false
    }

    const handler = sinon.spy()
    const wrapper = shallow(<SelectAllPanel {...testPropsChecked} onSelectAllChange={handler} />)
    wrapper.find("input").simulate("change")

    expect(handler.callCount).to.equal(1)
    expect(handler.calledWith(true)).to.equal(true)
  })
})
