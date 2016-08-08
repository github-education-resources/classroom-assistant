jest.unmock("../ItemArchivePanelList.jsx")
jest.unmock("../ItemArchivePanel.jsx")
jest.unmock("../../../shared/components/ItemPanel.jsx")

import React from "react"
import { shallow } from "enzyme"

import ItemArchivePanelList from "../ItemArchivePanelList"
import ActionableItemArchivePanel from "../../containers/ActionableItemArchivePanel"

let testProps = {
  submissions: [{
    id: 1,
    username: "test username",
    displayName: "test display name",
    avatarUrl: "/some/path.jpg",
    repoUrl: "http://www.someurl.com",
    progress: 100
  }, {
    id: 2,
    username: "test username",
    displayName: "test display name",
    avatarUrl: "/some/path.jpg",
    repoUrl: "http://www.someurl.com",
    progress: 100
  }]
}

describe("ItemArchivePanelList", () => {
  it("renders ItemArchivePanel components as children", () => {
    let wrapper = shallow(<ItemArchivePanelList {...testProps} />)
    expect(wrapper.find(ActionableItemArchivePanel).length).toEqual(2)
  })
})
