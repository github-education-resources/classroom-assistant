jest.unmock("../SubmissionList.jsx")

import React from "react"
import { shallow } from "enzyme"

import SelectableSubmission from "../../containers/SelectableSubmission.jsx"
import SubmissionList from "../SubmissionList.jsx"

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
  it("renders SelectableSubmission components as children", () => {
    let wrapper = shallow(<SubmissionList {...testProps} />)
    expect(wrapper.find(SelectableSubmission).length).toEqual(2)
  })
})
