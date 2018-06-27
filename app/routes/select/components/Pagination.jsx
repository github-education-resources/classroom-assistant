import React, { Component } from 'react'

export default class Pagination extends Component {

  constructor(props) {
    super(props)
  }

  // getLinkArray(){

  // }

  render() {
    return (
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">

            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>

          </ul>
        </nav>
      </div>
    )
  }
}
