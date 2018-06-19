import { connect } from "react-redux"

import React, { Component } from 'react'
import { submissionCreate } from "../modules/submissions/actions/submission-create"
import { num } from "../modules/submissions/selectors"
import {setAssignmentTitle} from "../modules/assignment/actions/assignment-set-title"
import {setAssignmentType} from "../modules/assignment/actions/assignment-set-type"
import { ipcRenderer, remote } from "electron"

class RootContainer extends Component {

    constructor (props){
        super(props);
        ipcRenderer.on('open-url', () => {
            var params = remote.getGlobal('sharedObj');
            if(params.urls && params.usernames){
                this.props.setAssignmentTitle(params.title)
                this.props.setAssignmentType(params.type)
                var urls = params.urls
                var usernames = params.usernames
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
    },
    setAssignmentTitle: (title) => {
        dispatch(setAssignmentTitle(title))
    },
    setAssignmentType: (type) => {
        dispatch(setAssignmentType(type))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)


