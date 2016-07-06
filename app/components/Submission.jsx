import React, { PropTypes } from "react"

const containerStyles = {
  padding: "10px",
  borderTop: "solid 1px #e3e3e3"
}

const Submission = ({
  id,
  username,
  displayName,
  avatarUrl,
  repoUrl,
  selected
}) => (
  <div style={containerStyles}>
    <div className="media">
      <a className="media-left" href="#">
        <img
          width="48px"
          height="48px"
          src={avatarUrl}
          className="media-object"
          alt={username}/>
      </a>
      <div className="media-body">
        <div className="row">
          <div className="col-xs-6">
            <h4 className="media-heading">@{username}</h4>
            {displayName}
          </div>
          <div className="col-xs-6">
            <a href={repoUrl}>{repoUrl}</a>
            <input type="checkbox" checked={selected} readOnly={true}/>
          </div>
        </div>
      </div>
    </div>
  </div>
)

Submission.propTypes = {
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  repoUrl: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired
}

export default Submission
