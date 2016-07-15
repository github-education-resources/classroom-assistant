import EditItemPanel from "../../shared/components/EditItemPanel"
import { connect } from "react-redux"

const mapStateToProps = (state) => ({
  title: `${state.submissions.filter(each => each.selected).length}/${state.submissions.length}`,
  iconPath: "http://placehold.it/48x48",
  subtitle: "Submissions Selected"
})

export default connect(mapStateToProps, null)(EditItemPanel)
