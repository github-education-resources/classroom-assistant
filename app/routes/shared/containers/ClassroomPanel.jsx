import React from "react"
import PropTypes from "prop-types"

import Header from "../components/Header"
import HeaderTitle from "../components/HeaderTitle"

const ClassroomPanel = ({
  title,
  subtitle
}) => {
  return (
    <Header >
      <HeaderTitle
        title="Select Assignment"
      />
    </Header>
  )
}

ClassroomPanel.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
}

export default ClassroomPanel
