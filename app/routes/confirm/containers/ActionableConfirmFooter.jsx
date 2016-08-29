import { push } from "react-router-redux"

import React, { PropTypes } from "react"
import { Link } from "react-router"
import { connect } from "react-redux"

import submissions from "../../../modules/submissions"

import Footer from "../../shared/components/Footer"

const ConfirmFooter = ({
  confirmClickHandler
}) => {
  return (
    <Footer>
      <Link to="/select" key={0}>
        <button className="btn btn-danger">Back</button>
      </Link>
      <button
        className="btn btn-success pull-right"
        onClick={confirmClickHandler}
      >
        Archive
      </button>
    </Footer>
  )
}

ConfirmFooter.propTypes = {
  confirmClickHandler: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  confirmClickHandler: () => {
    dispatch(push("/archive"))
    dispatch(submissions.actions.cloneAll())
  }
})

export default connect(null, mapDispatchToProps)(ConfirmFooter)
