import EditItemPanel from "../../shared/components/EditItemPanel"
import { connect } from "react-redux"
import { num, numSelected } from "../../../modules/submissions/selectors"

const mapStateToProps = (state) => ({
  title: `${numSelected(state)}/${num(state)}`,
  iconPath: "http://placehold.it/48x48",
  subtitle: "Submissions Selected"
})

export default connect(mapStateToProps, null)(EditItemPanel)
