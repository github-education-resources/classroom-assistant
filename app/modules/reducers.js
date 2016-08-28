import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import submissions from "./submissions/reducer"
import assignment from "./assignment/reducer"
import settings from "./settings/reducer"

export default combineReducers({
  submissions,
  assignment,
  settings,
  routing: routerReducer
})
