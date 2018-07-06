// import { expect } from "chai"
// import * as sinon from "sinon"

// import { fetchPage } from "../pagination-fetch-page"
// import {PAGINATION_RECEIVE, PAGINATION_RECEIVE_METADATA, PAGINATION_REQUEST} from "../../constants"
// import {SUBMISSION_CREATE} from "../../../submissions/constants"

// const jsonOK = (body) => {
//   const mockResponse = new window.Response(JSON.stringify(body), {
//     status: 200,
//     headers: {
//       "Content-type": "application/json"
//     }
//   })
//   return Promise.resolve(mockResponse)
// }

// describe("paginationFetchPage", () => {
//   let assignmentURL = "http://classroom.github.com/classrooms/test-org/assignments/test-assignment"

//   it("dispatches request page", async () => {
//     const dispatch = sinon.spy()
//     await fetchPage(1, assignmentURL)(dispatch)

//     // eslint-disable-next-line no-unused-expressions
//     expect(dispatch.calledWithMatch({ type: PAGINATION_REQUEST, id: 1 })).is.true
//   })

//   it("dispatches request info and receive info action after fetch", async () => {
//     const response = {name: "Test Assignment", type: "individual"}
//     const getState = () => ({ assignment: validAssignment })
//     const dispatch = sinon.spy()
//     sinon.stub(window, "fetch")
//     window.fetch.returns(jsonOK(response))
//     await assignmentFetchInfo()(dispatch, getState)
//     /* eslint-disable no-unused-expressions */
//     expect(dispatch.calledWithMatch({ type: ASSIGNMENT_REQUEST_INFO })).is.true
//     expect(dispatch.calledWithMatch({ type: ASSIGNMENT_RECEIVE_INFO, payload: response })).is.true
//     /* eslint-enable no-unused-expressions */
//   })
// })
