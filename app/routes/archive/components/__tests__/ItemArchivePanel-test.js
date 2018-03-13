jest.unmock("../ItemArchivePanel.jsx")

import React from "react"
import { shallow, configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import ItemArchivePanel from "../ItemArchivePanel.jsx"

beforeAll(() => {
  configure({ adapter: new Adapter() })
})

const completeProps = {
  id: 1,
  username: "test username",
  displayName: "test display name",
  avatarUrl: "/some/path.jpg",
  repoUrl: "http://www.someurl.com",
  cloneProgress: 100,
  cloneStatus: "Sample Status"
}

const progressProps = {
  id: 1,
  username: "test username",
  displayName: "test display name",
  avatarUrl: "/some/path.jpg",
  repoUrl: "http://www.someurl.com",
  cloneProgress: 32,
  cloneStatus: "Sample Status"
}

const noProgressProps = {
  id: 1,
  username: "test username",
  displayName: "test display name",
  avatarUrl: "/some/path.jpg",
  repoUrl: "http://www.someurl.com",
  cloneProgress: 0,
  cloneStatus: "Sample Status"
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

  it("renders a progress bar when the progress is between 0 and 100", () => {
    let wrapper = shallow(<ItemArchivePanel {...progressProps}/>)
    expect(wrapper.find(".progress-bar-info").length).toEqual(1)
  })

  it("does not render the progress bar when cloning is finished", () => {
    let wrapper = shallow(<ItemArchivePanel {...completeProps}/>)
    expect(wrapper.find(".progress-bar").length).toEqual(0)
  })

  it("renders the completion percentage inside the progress bar", () => {
    let wrapper = shallow(<ItemArchivePanel {...progressProps}/>)
    expect(wrapper.find(".progress-bar").text()).toEqual(progressProps.cloneProgress + "%")
  })

  it("renders the progress bar with the fill corresponding to the percentage", () => {
    let wrapper = shallow(<ItemArchivePanel {...progressProps}/>)
    expect(wrapper.find(".progress-bar").prop("aria-valuenow")).toEqual(progressProps.cloneProgress)
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
    let handler = jest.fn()
    let wrapper = shallow(<ItemArchivePanel {...completeProps} onViewClick={handler} />)
    wrapper.find("button").simulate("click")

    expect(handler.mock.calls.length).toBe(1)
  })

  it("renders a spinner when the progress is 0", () => {
    let wrapper = shallow(<ItemArchivePanel {...noProgressProps}/>)
    expect(wrapper.find("ReactSpinner").length).toBe(1)
  })
})
