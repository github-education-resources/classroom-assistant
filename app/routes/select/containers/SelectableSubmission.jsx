import { connect } from "react-redux"
import Submission from "../components/Submission"

import { submissionSelect } from "../../../modules/submissions/actions/submission-select"

const mapStateToProps = (state, ownProps) => ownProps

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSelectedChange: (newValue) => {
    dispatch(submissionSelect(ownProps.id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Submission)
