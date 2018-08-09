import React from "react"
import PropTypes from "prop-types"
import AssignmentIcon from "../../shared/components/AssignmentIcon"

const AssignmentCard = ({
  name,
  type,
  typeLabel,
  className,
}) => {
  return (
    <div className = {className}>
      <h5 className="text-center">Found Assignment!</h5>
      <div className="card text-green border-success">
        <div className="card-body">
          <div className="media w-100">
            <AssignmentIcon type={type} dark={true} />
            <div className="media-body">
              <div className="row">
                <div className="col-sm-6">
                  <h4 className="card-title my-0">{name}</h4>
                  {typeLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

AssignmentCard.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  typeLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default AssignmentCard
