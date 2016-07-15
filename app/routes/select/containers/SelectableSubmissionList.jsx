import { connect } from "react-redux"

import SubmissionList from "../components/SubmissionList"
import { all } from "../../../modules/submissions/selectors"

const mapStateToProps = (state) => {
  return {
    submissions: all(state)
  }
}

export default connect(mapStateToProps, null)(SubmissionList)
