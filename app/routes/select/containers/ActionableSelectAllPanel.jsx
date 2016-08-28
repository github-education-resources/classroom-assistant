import { connect } from "react-redux"

import SelectAllPanel from "../components/SelectAllPanel"
import submissions from "../../../modules/submissions"

const mapStateToProps = (state) => ({
  selected: submissions.selectors.numSelected(state),
  total: submissions.selectors.num(state),
  selectAll: submissions.selectors.areAllSelected(state)
})

const mapDispatchToProps = (dispatch) => ({
  onSelectAllChange: (newValue) => {
    dispatch(submissions.actions.selectAll(newValue))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectAllPanel)
