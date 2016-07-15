import { connect } from "react-redux"

import Header from "../components/Header"
import { all, typeLabel } from "../../../modules/assignment/selectors"

const mapStateToProps = (state) => {
  return {
    title: all(state).name,
    subtitle: typeLabel(state),
    imagePath: "http://placehold.it/48x48"
  }
}

export default connect(mapStateToProps, null)(Header)
