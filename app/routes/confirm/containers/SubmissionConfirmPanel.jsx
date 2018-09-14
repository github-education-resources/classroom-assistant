import ItemPanel from "../../shared/components/ItemPanel"
import { connect } from "react-redux"
import { num, numSelected } from "../../../modules/submissions/selectors"

const mapStateToProps = (state) => ({
  title: `${numSelected(state)}/${num(state)}`,
  iconName: "fa-check",
  subtitle: "Assignments Selected"
})

export default connect(mapStateToProps, null)(ItemPanel)
