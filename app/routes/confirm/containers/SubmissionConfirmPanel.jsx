import ItemPanel from "../../shared/components/ItemPanel"
import { connect } from "react-redux"
import submissions from "../../../modules/submissions"

const mapStateToProps = (state) => ({
  title: `${submissions.selectors.numSelected(state)}/${submissions.selectors.num(state)}`,
  imagePath: "http://placehold.it/48x48",
  subtitle: "Submissions Selected"
})

export default connect(mapStateToProps, null)(ItemPanel)
