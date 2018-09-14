import EditItemPanel from "../components/EditItemPanel"

import { connect } from "react-redux"
import { cloneDestination } from "../../../modules/settings/selectors"

import { settingsChangeDestinationWithDialog } from "../../../modules/settings/actions/settings-change-destination-with-dialog"

const mapStateToProps = (state) => ({
  title: "Archive Destination",
  subtitle: cloneDestination(state),
  rightIconName: "fa-pencil",
  leftIconName: "fa-file"
})

const mapDispatchToProps = (dispatch) => ({
  onEditClick: () => {
    dispatch(settingsChangeDestinationWithDialog())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditItemPanel)
