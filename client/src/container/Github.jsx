import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsers, fetchUserRepos, fetchSha, fetchFileContents, fetchRecursiveTree } from '../actions';
import GithubTree from '../components/TreeView';
import axios from 'axios';
import BurgerMenu from 'react-burger-menu';

const Menu = require('react-burger-menu').stack;

class Github extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedRepo: '', 
      filePaths: []
    }
  }
  componentWillMount() {
    this.props.fetchUserRepos();
  }

  handleClickedItem(userRepo){
    this.props.fetchSha(userRepo);
    this.setState({
      selectedRepo: userRepo
    });
  }
  handleFileClick(path, type, url){
    let repo = this.state.selectedRepo;
    //if component is a file, fetch the file content from API
    if (type === 'blob') {
      if(this.state.filePaths.length > 0){
        let urlPathArray = this.state.filePaths.slice();
        path = urlPathArray.join('/') + '/' + path;     
      }
      this.props.fetchFileContents(path, repo);
      setTimeout(() => {
        let content = this.props.Content;
        if (typeof content !== 'string') {
          content = JSON.stringify(content);
        }
        const contentToRoom = {
          text: content,
          room: this.props.roomId
        };
        this.props.socket.emit('change text', contentToRoom);
      }, 1000);
    //if component is a tree, get tree and add 'path' to file path
    } else if (type === 'tree') {
      const newPath = this.state.filePaths.slice();
      newPath.push(path);
      this.props.fetchRecursiveTree(url);
      this.setState({filePaths: newPath});
    }
  } 
  render(){
    if (!this.props.Repos) {
      return (
        <div className="github">
        <Menu customCrossIcon={ <img src="./images/list.png" width="96" height="96"/> }
              noOverlay >
            <h4>Your Github Files</h4>
            <a href="javascript:;">To see your files please login.</a>
          </Menu>
        </div>
      )
    }
    if (this.props.Trees.length > 0) {
      return (
          <div className="github">
          <Menu customCrossIcon={ <img src="./images/list.png" width="96" height="96"/> }
              noOverlay >

          <h4>Your Github Files</h4>
            <ul>
              {
                this.props.Trees.map((file, index) =>
                  <li className="menu-item" onClick={this.handleFileClick.bind(this, file.path, file.type, file.url)} key={index}><a>{file.path}</a></li>
                )
              }
            </ul>
          </Menu>
          </div>
        )
      }
    return (
      <div className="github">
        <Menu customCrossIcon={ <img src="./images/list.png" width="96" height="96"/> }
        noOverlay >
          <div>
            <h4>Your Github Files</h4>
            <ul>
             {
               this.props.Repos.map((repo, index) =>
                 <GithubTree handleClickedItem={this.handleClickedItem.bind(this, repo)} data={repo} tree={this.props.Trees} key={index}/>
               )
             }
            </ul>
          </div>
        </Menu>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    Repos: state.Repos.repos,
    Username: state.Repos.username,
    Trees: state.Repos.trees,
    Content: state.Repos.contents,
    RecursiveTrees: state.Repos.recursiveTrees,
    roomId: state.RoomId.roomId,
    socket: state.Socket.socket
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUsers: fetchUsers, fetchUserRepos: fetchUserRepos, fetchSha: fetchSha, fetchFileContents: fetchFileContents, fetchRecursiveTree:fetchRecursiveTree },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Github);