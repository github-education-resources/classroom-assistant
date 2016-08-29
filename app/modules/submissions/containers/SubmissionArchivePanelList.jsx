import { connect } from "react-redux"

import ItemArchivePanelList from "../components/ItemArchivePanelList"
import * as selectors from "../selectors"

const mapStateToProps = (state) => {
  return {
    submissions: selectors.selected(state)
  }
}

export default connect(mapStateToProps, null)(ItemArchivePanelList)
