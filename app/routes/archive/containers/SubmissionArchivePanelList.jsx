import { connect } from "react-redux"

import ItemArchivePanelList from "../components/ItemArchivePanelList"
import submissions from "../../../modules/submissions"

const mapStateToProps = (state) => {
  return {
    submissions: submissions.selectors.selected(state)
  }
}

export default connect(mapStateToProps, null)(ItemArchivePanelList)
