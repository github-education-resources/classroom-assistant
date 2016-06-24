import React, { PropTypes } from "react"
import { Pane, ListGroup } from "react-photonkit"
import Item from "./Item"

const ItemList = ({
  items,
  handleItemClick
}) => (
  <Pane>
    <ListGroup>
      {items.map((todo) => {
        return (
          <Item
            key={todo.id}
            text={todo.text}
            active={todo.active}
            handleClick={() => { handleItemClick(todo.id) }}
          />
        )
      })}
    </ListGroup>
  </Pane>
)

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  handleItemClick: PropTypes.func.isRequired
}

export default ItemList
