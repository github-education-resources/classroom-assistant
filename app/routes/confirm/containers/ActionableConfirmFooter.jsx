import React, { PropTypes } from "react"
import { Link } from "react-router"
import { connect } from "react-redux"
import { submissionClone } from "../../../modules/submissions/actions/submission-clone"

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
    dispatch(submissionClone())
  }
})

export default connect(null, mapDispatchToProps)(ConfirmFooter)
