import { connect } from "react-redux"

import EditItemPanel from "../components/EditItemPanel"
import settings from "../../../modules/settings"

const mapStateToProps = (state) => ({
  title: "Archive Destination",
  iconPath: "http://placehold.it/48x48",
  subtitle: settings.selectors.cloneDestination(state)
})

const mapDispatchToProps = (dispatch) => ({
  onEditClick: () => {
    dispatch(settings.actions.changeCloneDestinationWithDialog())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditItemPanel)
