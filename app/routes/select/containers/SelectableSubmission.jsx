import { connect } from "react-redux"
import Submission from "../components/Submission"

import submissions from "../../../modules/submissions"

const mapStateToProps = (state, ownProps) => ownProps

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSelectedChange: (newValue) => {
    dispatch(submissions.actions.select(ownProps.id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Submission)
