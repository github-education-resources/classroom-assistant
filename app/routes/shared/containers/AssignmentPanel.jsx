import { connect } from "react-redux"
import React from "react"
import PropTypes from "prop-types"

import Header from "../components/Header"
import HeaderTitle from "../components/HeaderTitle"
import AssignmentIcon from "../components/AssignmentIcon"

import { all, typeLabel } from "../../../modules/assignment/selectors"

const AssignmentPanel = ({
  title,
  subtitle,
  type,
}) => {
  return (
    <Header >
      <AssignmentIcon type={type}/>
      <HeaderTitle
        title={title}
        subtitle={subtitle}
        type={type}
      />
    </Header>
  )
}

AssignmentPanel.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  type: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {
    title: all(state).title,
    subtitle: typeLabel(state),
    type: all(state).type,
  }
}

export default connect(mapStateToProps, null)(AssignmentPanel)
