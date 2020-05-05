import { connect } from "react-redux"
import EditItemPanel from "../../shared/components/EditItemPanel"
import placeholder from "../../../resources/images/48x48.png"

const mapStateToProps = (state) => {
  return {
    title: `${state.submissions.filter(each => each.selected).length}/${state.submissions.length}`,
    imagePath: { placeholder },
    subtitle: "Submissions Selected"
  }
}

export default connect(mapStateToProps, null)(EditItemPanel)
