import { expect } from "chai"
import React from "react"
import { shallow } from "enzyme"

import Spinner from "../../../shared/components/Spinner"
import ProgressBar from "../../../shared/components/ProgressBar"

import ItemArchivePanel from "../ItemArchivePanel"

const completeProps = {
  id: 1,
  username: "test username",
  displayName: "test display name",
  avatarUrl: "/some/path.jpg",
  repoUrl: "https://www.someurl.com",
  cloneProgress: 100,
  cloneStatus: "Sample Status"
}

const progressProps = {
  id: 1,
  username: "test username",
  displayName: "test display name",
  avatarUrl: "/some/path.jpg",
  repoUrl: "https://www.someurl.com",
  cloneProgress: 32,
  cloneStatus: "Sample Status"
}

const statusProps = {
  id: 1,
  username: "test username",
  displayName: "test display name",
  avatarUrl: "/some/path.jpg",
  repoUrl: "https://www.someurl.com",
  cloneProgress: 0,
  cloneStatus: "Sample Status"
}

const noProgressProps = {
  id: 1,
  username: "test username",
  displayName: "test display name",
  avatarUrl: "/some/path.jpg",
  repoUrl: "https://www.someurl.com",
  cloneProgress: 0
}

describe("ItemArchivePanel", () => {
  it("renders an ItemPanel, correctly passing down properties", () => {
    const wrapper = shallow(<ItemArchivePanel {...progressProps}/>)

    const itemPanels = wrapper.find("ItemPanel")
    expect(itemPanels.length).equals(1)

    const itemPanel = itemPanels.first()
    expect(itemPanel.prop("imagePath")).equals(progressProps.avatarUrl)
    expect(itemPanel.prop("title")).equals(progressProps.username)
    expect(itemPanel.prop("subtitle")).equals(progressProps.displayName)
  })

  it("renders a progress bar when the progress is between 0 and 100", () => {
    const wrapper = shallow(<ItemArchivePanel {...progressProps}/>)
    expect(wrapper.find(ProgressBar).length).equals(1)
  })

  it("does not render the progress bar when cloning is finished", () => {
    const wrapper = shallow(<ItemArchivePanel {...completeProps}/>)
    expect(wrapper.find(ProgressBar).length).equals(0)
  })

  it("renders a 'view' button when the progress is at 100", () => {
    const wrapper = shallow(<ItemArchivePanel {...completeProps}/>)
    expect(wrapper.find("button").text().indexOf("View")).does.not.equal(-1)
  })

  it("does not render a button when the progress is not 100", () => {
    const wrapper = shallow(<ItemArchivePanel {...progressProps}/>)
    expect(wrapper.find("button").length).equals(0)
  })

  it("calls handler when the 'view' button is pressed", () => {
    let wasCalled = false

    const handler = () => {
      wasCalled = true
    }
    const wrapper = shallow(<ItemArchivePanel {...completeProps} onViewClick={handler} />)
    wrapper.find("button").simulate("click")

    expect(wasCalled).equals(true)
  })

  it("renders a spinner when the progress is 0 and clone status is empty", () => {
    const wrapper = shallow(<ItemArchivePanel {...noProgressProps}/>)
    expect(wrapper.find(Spinner).length).equals(1)
  })

  it("renders no spinner when the progress is 0 with status message", () => {
    const wrapper = shallow(<ItemArchivePanel {...statusProps}/>)
    expect(wrapper.find(Spinner).length).equals(0)
  })
})
