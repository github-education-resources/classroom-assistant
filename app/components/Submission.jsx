import React, { PropTypes } from "react"

const Submission = ({
  id,
  username,
  displayName,
  avatarUrl,
  repoUrl,
  selected
}) => (
  <div
    className="flex-table border-top"
    styles={{
      paddingTop: "20px",
      paddingBottom: "20px"
    }}>
    <div className="flex-table-item">
      <img
        className="avatar left"
        width="48px"
        height="48px"
        alt={username}
        src={avatarUrl}/>
      <div>
        <a className="css-truncate css-truncate-target">
          @{username}
        </a>
        <span className="text-muted css-truncate css-truncate-target">
          {displayName}
        </span>
      </div>
    </div>
    <div className="flex-table-item">
      <a href={repoUrl}>{repoUrl}</a>
      <input type="checkbox" checked={selected} readOnly={true}/>
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
