import { connect } from "react-redux"

import ItemArchivePanel from "../components/ItemArchivePanel"
import { submissionViewDirectory } from "../../../modules/submissions/actions/submission-view-directory"

const mapStateToProps = (state, ownProps) => ownProps

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onViewClick: () => {
      dispatch(submissionViewDirectory(ownProps.id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemArchivePanel)
