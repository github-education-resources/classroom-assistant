import ItemPanel from "../../shared/components/ItemPanel"
import { connect } from "react-redux"
import { num, numSelected } from "../../../modules/submissions/selectors"

const mapStateToProps = (state) => ({
  title: `${numSelected(state)}/${num(state)}`,
  imagePath: "http://placehold.it/48x48",
  subtitle: "Submissions Selected"
})

export default connect(mapStateToProps, null)(ItemPanel)
