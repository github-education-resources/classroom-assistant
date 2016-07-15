import { connect } from "react-redux"

import SelectAllPanel from "../components/SelectAllPanel"
import { submissionChangeAll } from "../../../modules/submissions/actions/submission-change-all"
import { numSelected, num, areAllSelected } from "../../../modules/submissions/selectors"

const mapStateToProps = (state) => ({
  selected: numSelected(state),
  total: num(state),
  selectAll: areAllSelected(state)
})

const mapDispatchToProps = (dispatch) => ({
  onSelectAllChange: (newValue) => {
    dispatch(submissionChangeAll(newValue))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectAllPanel)
