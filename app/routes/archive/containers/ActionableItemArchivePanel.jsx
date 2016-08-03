import { connect } from "react-redux"

import ItemArchivePanel from "../components/ItemArchivePanel"

const mapStateToProps = (state, ownProps) => ownProps

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onViewClick: () => {
      console.log("Clicked View!")
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemArchivePanel)
