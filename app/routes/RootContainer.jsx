import { connect } from "react-redux"

import React, { Component } from 'react'
import { submissionCreate } from "../modules/submissions/actions/submission-create"
import { num } from "../modules/submissions/selectors"
import { ipcRenderer, remote } from "electron"

class RootContainer extends Component {

    constructor (props){
        super(props);

        ipcRenderer.on('open-url', () => {
                if(remote.getGlobal('sharedObj').urls && remote.getGlobal('sharedObj').usernames){
                var urls = remote.getGlobal('sharedObj').urls
                var usernames = remote.getGlobal('sharedObj').usernames
                for(var i = 0; i<urls.length; i++){
                    this.props.onCreate(
                    {
                        id: this.props.total,	
                        username: usernames[i],		
                        displayName: usernames[i],		
                        avatarUrl: `https://avatars.githubusercontent.com/${usernames[i]}?v=3&size=96`,		
                        repoUrl: urls[i],		
                        selected: true,		
                        clonePath: "",		
                        cloneStatus: "",		
                        cloneProgress: 0
                    });
                }
                this.props.router.push("/select")
            }
        });
    }
    render() {
        return (
        <div>
            {this.props.children}
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    total: num(state)
  })
  
const mapDispatchToProps = (dispatch) => ({
    onCreate: (data) => {
        dispatch(submissionCreate(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)


