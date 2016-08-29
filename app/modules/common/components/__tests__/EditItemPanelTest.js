jest.unmock("../EditItemPanel.jsx")

import React from "react"
import { shallow } from "enzyme"

import EditItemPanel from "../EditItemPanel.jsx"

describe("EditItemPanel", () => {
  const staticOptions = {
    iconPath: "some/path.jpg",
    title: "some title",
    subtitle: "some subtitle"
  }

  it("calls onEditClick when pencil is clicked", () => {
    let clickHandler = jest.fn()
    let wrapper = shallow(<EditItemPanel {...staticOptions} onEditClick={clickHandler}/>)

    wrapper.find("i").simulate("click")
    expect(clickHandler.mock.calls.length).toBe(1)
  })

  it("renders an ItemPanel, correctly passing down properties", () => {
    let noop = () => {}
    let wrapper = shallow(<EditItemPanel {...staticOptions} onEditClick={noop}/>)

    const itemPanels = wrapper.find("ItemPanel")
    expect(itemPanels.length).toBe(1)

    const itemPanel = itemPanels.first()
    expect(itemPanel.prop("imagePath")).toEqual(staticOptions.iconPath)
    expect(itemPanel.prop("title")).toEqual(staticOptions.title)
    expect(itemPanel.prop("subtitle")).toEqual(staticOptions.subtitle)
  })
})
