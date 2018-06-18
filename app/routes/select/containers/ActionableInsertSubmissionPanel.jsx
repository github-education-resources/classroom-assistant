import { connect } from "react-redux"

import InsertSubmissionPanel from "../components/InsertSubmissionPanel"
import { submissionCreate } from "../../../modules/submissions/actions/submission-create"
import { num } from "../../../modules/submissions/selectors"

const mapStateToProps = (state) => ({
  total: num(state)
})

const mapDispatchToProps = (dispatch) => ({
  onCreate: (data) => {
    dispatch(submissionCreate(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InsertSubmissionPanel)
