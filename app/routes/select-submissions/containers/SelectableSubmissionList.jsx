import { connect } from "react-redux"
import SubmissionList from "../components/SubmissionList"

const mapStateToProps = (state) => {
  return {
    submissions: state.submissions
  }
}

export default connect(mapStateToProps, null)(SubmissionList)
