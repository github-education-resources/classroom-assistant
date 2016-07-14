import { connect } from "react-redux"
import SelectAllPanel from "../components/SelectAllPanel"

import { submissionChangeAll } from "../../../modules/submissions/actions/submission-change-all"

const mapStateToProps = (state) => ({
  selected: state.submissions.filter(each => each.selected).length,
  total: state.submissions.length,
  selectAll: state.submissions.every(each => each.selected)
})

const mapDispatchToProps = (dispatch) => ({
  onSelectAllChange: (newValue) => {
    dispatch(submissionChangeAll(newValue))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectAllPanel)
