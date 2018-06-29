import React from "react"
import PropTypes from "prop-types"

const AssignmentCard = ({
  name,
  type,
  imagePath,
}) => {
  return (
    <div>
      <h5 className="text-center">Found Assignment!</h5>
      <div className="card text-green border-success">
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{type}</p>
        </div>
      </div>
    </div>
  )
}

AssignmentCard.defaultProps = {
  imagePath: "http://placehold.it/48x48",
}

AssignmentCard.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  imagePath: PropTypes.string,
}

export default AssignmentCard
