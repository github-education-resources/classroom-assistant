jest.unmock("../ItemArchivePanel.jsx")

import React from "react"
import { shallow } from "enzyme"
import sinon from "sinon"

import ItemArchivePanel from "../ItemArchivePanel.jsx"

const completeProps = {
  id: 1,
  username: "test username",
  displayName: "test display name",
  avatarUrl: "/some/path.jpg",
  repoUrl: "http://www.someurl.com",
  progress: 100
}

const progressProps = {
  id: 1,
  username: "test username",
  displayName: "test display name",
  avatarUrl: "/some/path.jpg",
  repoUrl: "http://www.someurl.com",
  progress: 32
}

describe("ItemArchivePanel", () => {
  it("renders an ItemPanel, correctly passing down properties", () => {
    let wrapper = shallow(<ItemArchivePanel {...progressProps}/>)

    const itemPanels = wrapper.find("ItemPanel")
    expect(itemPanels.length).toBe(1)

    const itemPanel = itemPanels.first()
    expect(itemPanel.prop("imagePath")).toEqual(progressProps.avatarUrl)
    expect(itemPanel.prop("title")).toEqual(progressProps.username)
    expect(itemPanel.prop("subtitle")).toEqual(progressProps.displayName)
  })

  it("renders a 'success' progress bar when the progress is 100", () => {
    let wrapper = shallow(<ItemArchivePanel {...completeProps}/>)
    expect(wrapper.find(".progress-bar-success").length).toEqual(1)
  })

  it("renders an 'info' progress bar when the progress is not 100", () => {
    let wrapper = shallow(<ItemArchivePanel {...progressProps}/>)
    expect(wrapper.find(".progress-bar-info").length).toEqual(1)
  })

  it("renders the completion percentage inside the progress bar", () => {
    let wrapper = shallow(<ItemArchivePanel {...progressProps}/>)
    expect(wrapper.find(".progress-bar").text()).toEqual(progressProps.progress + "%")
  })

  it("renders the progress bar with the fill corresponding to the percentage", () => {
    let wrapper = shallow(<ItemArchivePanel {...progressProps}/>)
    expect(wrapper.find(".progress-bar").prop("aria-valuenow")).toEqual(progressProps.progress)
  })

  it("renders a 'view' button when the progress is at 100", () => {
    let wrapper = shallow(<ItemArchivePanel {...completeProps}/>)
    expect(wrapper.find("button").text().indexOf("View")).not.toBe(-1)
  })

  it("does not render a button when the progress is not 100", () => {
    let wrapper = shallow(<ItemArchivePanel {...progressProps}/>)
    expect(wrapper.find("button").length).toBe(0)
  })

  it("calls handler when the 'view' button is pressed", () => {
    let handler = sinon.spy()
    let wrapper = shallow(<ItemArchivePanel {...completeProps} onViewClick={handler} />)
    wrapper.find("button").simulate("click")

    expect(handler.callCount).toBe(1)
  })
})
