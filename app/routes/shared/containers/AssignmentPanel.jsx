import { connect } from "react-redux"

import Header from "../components/Header"

const mapStateToProps = (state) => {
  let typeLabel =
  (state.assignment.type === "individual")
  ? "Individual Assignment" : "Group Assignment"

  return {
    title: state.assignment.name,
    subtitle: typeLabel,
    imagePath: "http://placehold.it/48x48"
  }
}

export default connect(mapStateToProps, null)(Header)
