import { connect } from "react-redux"
import ItemArchivePanelList from "../components/ItemArchivePanelList"

const mapStateToProps = (state) => {
  return {
    submissions: state.submissions.filter(each => each.selected)
  }
}

export default connect(mapStateToProps, null)(ItemArchivePanelList)
