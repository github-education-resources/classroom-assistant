import { connect } from "react-redux"

import Header from "../components/Header"
import assignment from "../../../modules/assignment"

const mapStateToProps = (state) => {
  return {
    title: assignment.selectors.all(state).name,
    subtitle: assignment.selectors.typeLabel(state),
    imagePath: "http://placehold.it/48x48"
  }
}

export default connect(mapStateToProps, null)(Header)
