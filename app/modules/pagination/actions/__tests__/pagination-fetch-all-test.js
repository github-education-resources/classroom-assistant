// import { expect } from "chai"
// import * as sinon from "sinon"

// import { paginationFetchAll } from "../pagination-fetch-all"

// const jsonOK = (body) => {
//   const mockResponse = new window.Response(JSON.stringify(body), {
//     status: 200,
//     headers: {
//       "Content-type": "application/json"
//     }
//   })
//   return Promise.resolve(mockResponse)
// }

// describe("paginationFetchAll", () => {
//   it("dispatches fetchPage for every page", () => {
//     sinon.stub(window, "fetch")
//     window.fetch.returns(jsonOK(response))

//     const getState = () => ({ submissions: [ mockSubmission ] })
//     const dispatch = sinon.spy()
//     await submissionCloneAll()(dispatch, getState)

//     // eslint-disable-next-line no-unused-expressions
//     expect(cloneMock.calledWithMatch("http://github.com/CS50Spring2016/assignment-1-introduction-to-programming-StudentEvelyn")).is.true
//   })
// })
