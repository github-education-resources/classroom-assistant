import { connect } from "react-redux"

import Submission from "../components/Submission"
import actions from "../actions"

const mapStateToProps = (state, ownProps) => ownProps

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSelectedChange: (newValue) => {
    dispatch(actions.select(ownProps.id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Submission)
