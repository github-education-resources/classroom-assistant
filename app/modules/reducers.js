import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"

import submissions from "./submissions/reducers/submissions"
import assignment from "./assignment/reducers/assignment"
import settings from "./settings/reducers/settings"
import pagination from "./pagination/reducers/pagination"

export default combineReducers({
  submissions,
  assignment,
  settings,
  pagination,
  routing: routerReducer
})
