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
          <div className="media w-100">
            <img className="mr-3" src={imagePath} alt={name} />
            <div className="media-body">
              <div className="row">
                <div className="col-sm-6">
                  <h4 className="card-title my-0">{name}</h4>
                  {type}
                </div>
              </div>
            </div>
          </div>
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
