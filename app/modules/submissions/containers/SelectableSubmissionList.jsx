import { connect } from "react-redux"

import SubmissionList from "../components/SubmissionList"
import * as selectors from "../selectors"

const mapStateToProps = (state) => {
  return {
    submissions: selectors.all(state)
  }
}

export default connect(mapStateToProps, null)(SubmissionList)
