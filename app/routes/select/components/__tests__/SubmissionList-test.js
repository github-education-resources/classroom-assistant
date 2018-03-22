import { expect } from "chai"
import React from "react"
import { shallow } from "enzyme"

import SubmissionList from "../SubmissionList.jsx"
import SelectableSubmission from "../../containers/SelectableSubmission.jsx"

describe("SubmissionList", () => {
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

  it("renders SelectableSubmission components as children", () => {
    let wrapper = shallow(<SubmissionList {...testProps} />)
    expect(wrapper.find(SelectableSubmission).length).to.equal(2)
  })
})
