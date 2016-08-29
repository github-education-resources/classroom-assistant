import { connect } from "react-redux"

import SelectAllPanel from "../components/SelectAllPanel"
import * as selectors from "../selectors"
import actions from "../actions"

const mapStateToProps = (state) => ({
  selected: selectors.numSelected(state),
  total: selectors.num(state),
  selectAll: selectors.areAllSelected(state)
})

const mapDispatchToProps = (dispatch) => ({
  onSelectAllChange: (newValue) => {
    dispatch(actions.selectAll(newValue))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectAllPanel)
