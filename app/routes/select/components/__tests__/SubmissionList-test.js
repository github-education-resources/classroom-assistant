jest.unmock("../SubmissionList.jsx")
jest.unmock("../../../shared/components/ItemPanel.jsx")

import React from "react"
import { shallow, configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

import SubmissionList from "../SubmissionList.jsx"
import SelectableSubmission from "../../containers/SelectableSubmission.jsx"

beforeAll(() => {
  configure({ adapter: new Adapter() })
})

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
