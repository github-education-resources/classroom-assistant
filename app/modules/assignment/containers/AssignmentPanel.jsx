import { connect } from "react-redux"

import Header from "../components/Header"
import * as selectors from "../selectors"

const mapStateToProps = (state) => {
  return {
    title: selectors.all(state).name,
    subtitle: selectors.typeLabel(state),
    imagePath: "http://placehold.it/48x48"
  }
}

export default connect(mapStateToProps, null)(Header)
