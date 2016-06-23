import React, { PropTypes } from "react"
import {ListItem} from "react-photonkit"

const Item = ({
  text,
  active,
  handleClick
}) => {
  return (
    <div
      onClick={handleClick}>
      <ListItem
          image="https://avatars3.githubusercontent.com/u/1744446?v=3&s=400"
          title={text}
          subtitle="subtitle"
          active={active} />
    </div>
  )
}

Item.propTypes = {
  text: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default Item
