import React, { Component } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import { modalOn, modalOff } from '../../actions/voiceActions.js';
import { connect } from 'react-redux';
import Voice from './Voice.jsx';

class SpeechModal extends Component {
  constructor(props){
    super(props);
    // super(props);
    // this.state = {
    //   isOpen: false
    // }
    // this.openModal = this.openModal.bind(this);
    // this.hideModal = this.hideModal.bind(this);
  }

  // openModal(){
  //   this.setState({
  //     isOpen: true
  //   })
  // }

  // hideModal(){
  //   this.setState({
  //     isOpen: false
  //   })
  // }

  render() {
    console.log('fetchedNoris are: ', this.props.noris)
    return (
      <div>

        <Modal isOpen={this.props.isOpen} onRequestHide={this.props.modalOff}>
          <ModalHeader>
            <ModalClose onClick={this.props.modalOff}/>
            <div className="create-title">
            <ModalTitle className="default-font">Obento with Voice</ModalTitle>
            </div>
          </ModalHeader>
          <ModalBody>
            <Voice noris={this.props.noris}/>
          </ModalBody>
          <ModalFooter>

          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default connect(
  (state) => ({
    isOpen: state.voiceReducer.isOpen,
    noris: state.displayReducer.bentoData
  }),
  { modalOn, modalOff }
)(SpeechModal);



 


