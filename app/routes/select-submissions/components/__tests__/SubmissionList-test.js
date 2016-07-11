jest.unmock("../SubmissionList.jsx")
jest.unmock("../Submission.jsx")
jest.unmock("../SelectAllPanel.jsx")
jest.unmock("../../../shared/components/ItemPanel.jsx")

import React from "react"
import { mount } from "enzyme"

import SubmissionList from "../SubmissionList.jsx"
import Submission from "../Submission.jsx"
import SelectAllPanel from "../SelectAllPanel.jsx"

let testProps = {
  submissions: [{
    id: 1,
    username: "testusername",
    displayName: "testdisplayname",
    avatarUrl: "/some/path.jpg",
    repoUrl: "http://some/path.com",
    selected: false
  }, {
    id: 2,
    username: "testusername",
    displayName: "testdisplayname",
    avatarUrl: "/some/path.jpg",
    repoUrl: "http://some/path.com",
    selected: true
  }]
}

describe("SubmissionList", () => {
  it("renders Submission components as children", () => {
    let wrapper = mount(<SubmissionList {...testProps} />)
    expect(wrapper.find(Submission).length).toEqual(2)
  })

  it("renders a SelectAllPanel", () => {
    let wrapper = mount(<SubmissionList {...testProps} />)
    expect(wrapper.find(SelectAllPanel).length).toEqual(1)
  })
})
