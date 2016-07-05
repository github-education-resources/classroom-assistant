import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import submissions from "./submissions"
import organization from "./organization"
import assignment from "./assignment"

export default combineReducers({
  organization,
  submissions,
  assignment,
  routing: routerReducer
})
