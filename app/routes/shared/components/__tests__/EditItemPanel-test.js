import { expect } from "chai"
import React from "react"
import { shallow } from "enzyme"

import EditItemPanel from "../EditItemPanel"

describe("EditItemPanel", () => {
  const staticOptions = {
    imagePath: "some/path.jpg",
    title: "some title",
    subtitle: "some subtitle"
  }

  it("calls onEditClick when pencil is clicked", () => {
    let wasCalled = false
    const clickHandler = () => {
      wasCalled = true
    }
    const wrapper = shallow(<EditItemPanel {...staticOptions} onEditClick={clickHandler}/>)

    wrapper.find("i").simulate("click")
    expect(wasCalled).to.equal(true)
  })

  it("renders an ItemPanel, correctly passing down properties", () => {
    const noop = () => {}
    const wrapper = shallow(<EditItemPanel {...staticOptions} onEditClick={noop}/>)

    const itemPanels = wrapper.find("ItemPanel")
    expect(itemPanels.length).to.equal(1)

    const itemPanel = itemPanels.first()
    expect(itemPanel.prop("imagePath")).to.equal(staticOptions.imagePath)
    expect(itemPanel.prop("title")).to.equal(staticOptions.title)
    expect(itemPanel.prop("subtitle")).to.equal(staticOptions.subtitle)
  })
})
