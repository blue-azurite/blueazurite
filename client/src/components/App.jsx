import React, { Component } from 'react';
import VideoChat from '../container/Video';
import Github from '../container/Github';
import CodeEditor from '../container/Editor';
import Chatbox from '../container/Chatbox';
import Nav from './Nav';
import Modal from '../container/Modal';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
        <Modal />
        {/* Navigation */}
        <Nav />
        <div className="container header">
          <div className="page-header" id="banner">
            {/* Start Header */} 
            <div className="row">
              <div className="col-lg-12">
              </div>
            </div>
            {/* End Header */} 
            <br />
            {/* Start Editor && Video Container*/} 
            <div className="row">
              <div className="col-lg-2 overflowControl">
                <Github />
              </div>
              <div className="col-lg-6">
                <br />
                <br />

                <CodeEditor />
              </div>
              <div className="col-lg-4">
                <br />
                <br />
                  <VideoChat />
              </div>
            </div>
            {/* End Editor && Video Container*/} 
            
            {/* Start Chat */} 
            <div className="row">
              <div className="col-lg-12">
                <Chatbox />
              </div>
            </div>
            {/* End Chat */} 

          </div>
        </div>


        </div>
      </div>
    );
  }
}