import { connect } from "react-redux"

import SelectAllPanel from "../components/SelectAllPanel"
import { submissionSelectAll } from "../../../modules/submissions/actions/submission-select-all"
import { numSelected, num, areAllSelected } from "../../../modules/submissions/selectors"

const mapStateToProps = (state) => ({
  selected: numSelected(state),
  total: num(state),
  selectAll: areAllSelected(state)
})

const mapDispatchToProps = (dispatch) => ({
  onSelectAllChange: (newValue) => {
    dispatch(submissionSelectAll(newValue))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectAllPanel)
