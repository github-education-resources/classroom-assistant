import React, { Component } from 'react'
import { remote } from "electron"

class InsertSubmissionPanel extends Component {

  constructor (props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e){
    if(e) e.preventDefault();
    this.props.onCreate(
      {
        id: this.props.total,		
        username: "Test",		
        displayName: "Test",		
        avatarUrl: "https://avatars.githubusercontent.com/u/16492679?v=3&size=96",		
        repoUrl: this.refs.url.value,		
        selected: true,		
        clonePath: "",		
        cloneStatus: "",		
        cloneProgress: 0
      });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input ref="url" type="text" label="Github URL"></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default InsertSubmissionPanel;
