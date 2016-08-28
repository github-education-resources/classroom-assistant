import { connect } from "react-redux"

import SubmissionList from "../components/SubmissionList"
import submissions from "../../../modules/submissions"

const mapStateToProps = (state) => {
  return {
    submissions: submissions.selectors.all(state)
  }
}

export default connect(mapStateToProps, null)(SubmissionList)
