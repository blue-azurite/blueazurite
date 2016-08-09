import React, { Component } from 'react';
import TextEditor from '../container/TextEditor';
import VideoChat from '../container/Video';
// import TextEditor from '../container/TextEditor';
import CodeEditor from './Editor'

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <CodeEditor />
        </div>
        <div>
          <VideoChat />
        </div>
        {this.props.children}
      </div>
    );
  }
}