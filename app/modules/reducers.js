import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import submissions from "./submissions/reducers/submissions"
import assignment from "./assignment/reducers/assignment"

export default combineReducers({
  submissions,
  assignment,
  routing: routerReducer
})
