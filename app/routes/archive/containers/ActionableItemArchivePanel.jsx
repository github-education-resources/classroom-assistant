// PUBLIC: Redux container that wraps ItemArchivePanel and maps the
// "submissionViewDirectory" action to the "View" button dispayed when
// the item is finished cloning.

import { connect } from "react-redux"

import ItemArchivePanel from "../components/ItemArchivePanel"
import { submissionViewDirectory } from "../../../modules/submissions/actions/submission-view-directory"
import {type} from "../../../modules/assignment/selectors"

const mapStateToProps = (state, ownProps) => {
  return Object.assign({}, ownProps, {
    assignmentType: type(state)
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onViewClick: () => {
      dispatch(submissionViewDirectory(ownProps.id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemArchivePanel)
