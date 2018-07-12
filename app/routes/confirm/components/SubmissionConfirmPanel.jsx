import { connect } from "react-redux"
import EditItemPanel from "../../shared/components/EditItemPanel"

const mapStateToProps = (state) => {
  return {
    title: `${state.submissions.filter(each => each.selected).length}/${state.submissions.length}`,
    imagePath: "http://placehold.it/48x48",
    subtitle: "Submissions Selected"
  }
}

export default connect(mapStateToProps, null)(EditItemPanel)
