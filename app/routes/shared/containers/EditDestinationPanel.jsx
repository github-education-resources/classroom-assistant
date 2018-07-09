import EditItemPanel from "../components/EditItemPanel"

import { connect } from "react-redux"
import { cloneDestination } from "../../../modules/settings/selectors"

import { settingsChangeDestinationWithDialog } from "../../../modules/settings/actions/settings-change-destination-with-dialog"

const mapStateToProps = (state) => ({
  title: "Archive Destination",
  imagePath: "http://placehold.it/48x48",
  subtitle: cloneDestination(state)
})

const mapDispatchToProps = (dispatch) => ({
  onEditClick: () => {
    dispatch(settingsChangeDestinationWithDialog())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditItemPanel)
