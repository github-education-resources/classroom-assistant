// PUBLIC: Redux container that wraps ItemArchivePanel and maps the
// "submissionViewDirectory" action to the "View" button dispayed when
// the item is finished cloning.

import { connect } from "react-redux"

import ItemArchivePanel from "../components/ItemArchivePanel"
import actions from "../actions"

const mapStateToProps = (state, ownProps) => ownProps

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onViewClick: () => {
      dispatch(actions.viewDirectory(ownProps.id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemArchivePanel)
