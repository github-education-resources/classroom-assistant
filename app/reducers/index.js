import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import submissions from "./submissions"
import assignment from "./assignment"

export default combineReducers({
  submissions,
  assignment,
  routing: routerReducer
})
