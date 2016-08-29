import { connect } from "react-redux"

import EditItemPanel from "../../common/components/EditItemPanel"
import * as selectors from "../selectors"

import actions from "../actions"

const mapStateToProps = (state) => ({
  title: "Archive Destination",
  iconPath: "http://placehold.it/48x48",
  subtitle: selectors.cloneDestination(state)
})

const mapDispatchToProps = (dispatch) => ({
  onEditClick: () => {
    dispatch(actions.changeCloneDestinationWithDialog())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditItemPanel)
