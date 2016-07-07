
import { connect } from "react-redux"
import ItemArchivePanelList from "../components/ItemArchivePanelList"

const mapStateToProps = (state) => {
  return {
    submissions: state.submissions
  }
}

export default connect(mapStateToProps, null)(ItemArchivePanelList)
