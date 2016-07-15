import { connect } from "react-redux"

import ItemArchivePanelList from "../components/ItemArchivePanelList"
import { selected } from "../../../modules/submissions/selectors"

const mapStateToProps = (state) => {
  return {
    submissions: selected(state)
  }
}

export default connect(mapStateToProps, null)(ItemArchivePanelList)
