jest.unmock("../ConfirmPanel.jsx")

import React from "react"
import { shallow } from "enzyme"
import sinon from "sinon"

import ConfirmPanel from "../ConfirmPanel.jsx"

describe("ConfirmPanel", () => {
  const staticOptions = {
    iconPath: "some/path.jpg",
    title: "some title",
    subtitle: "some subtitle"
  }

  it("calls onEditClick when pencil is clicked", () => {
    let clickHandler = sinon.spy()
    let wrapper = shallow(<ConfirmPanel {...staticOptions} onEditClick={clickHandler}/>)

    wrapper.find("i").simulate("click")
    expect(clickHandler.callCount).toBe(1)
  })

  it("renders an ItemPanel, correctly passing down properties", () => {
    let noop = () => {}
    let wrapper = shallow(<ConfirmPanel {...staticOptions} onEditClick={noop}/>)

    const itemPanels = wrapper.find("ItemPanel")
    expect(itemPanels.length).toBe(1)

    const itemPanel = itemPanels.first()
    expect(itemPanel.prop("imagePath")).toEqual(staticOptions.iconPath)
    expect(itemPanel.prop("title")).toEqual(staticOptions.title)
    expect(itemPanel.prop("subtitle")).toEqual(staticOptions.subtitle)
  })
})
