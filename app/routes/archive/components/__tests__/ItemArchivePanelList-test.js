import { expect } from "chai"

import React from "react"
import { shallow } from "enzyme"

import ItemArchivePanelList from "../ItemArchivePanelList"
import ActionableItemArchivePanel from "../../containers/ActionableItemArchivePanel"

const testProps = {
  submissions: [{
    id: 1,
    username: "test username",
    displayName: "test display name",
    avatarUrl: "/some/path.jpg",
    repoUrl: "https://www.someurl.com",
    progress: 100
  }, {
    id: 2,
    username: "test username",
    displayName: "test display name",
    avatarUrl: "/some/path.jpg",
    repoUrl: "https://www.someurl.com",
    progress: 100
  }]
}

describe("ItemArchivePanelList", () => {
  it("renders ItemArchivePanel components as children", () => {
    const wrapper = shallow(<ItemArchivePanelList {...testProps} />)
    expect(wrapper.find(ActionableItemArchivePanel).length).to.equal(2)
  })
})
