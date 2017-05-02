import React, { Component } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';
import { modalOn, modalOff } from '../../actions/voiceActions.js';
import { connect } from 'react-redux';


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
    return (
      <div>
       {/*<button className="speechButton btn btn-success" onClick={this.props.modalOn}>Modal</button>*/} 
        <Modal isOpen={this.props.isOpen} onRequestHide={this.props.modalOff}>
          <ModalHeader>
            <ModalClose onClick={this.props.modalOff}/>
            <ModalTitle>Modal title</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Ab ea ipsam iure perferendis! Ad debitis dolore excepturi
              explicabo hic incidunt placeat quasi repellendus soluta,
              vero. Autem delectus est laborum minus modi molestias
              natus provident, quidem rerum sint, voluptas!</p>
          </ModalBody>
          <ModalFooter>
            {/*<button className='btn btn-default' onClick={this.props.modalOff}>
              Close
            </button>
            <button className='btn btn-primary'>
              Save changes
            </button>*/}
          </ModalFooter>
        </Modal>

      </div>
    );
  }
}

export default connect(
  (state) => ({
    isOpen: state.voiceReducer.isOpen,
    noris: state.voiceReducer.noris
  }),
  { modalOn, modalOff }
)(SpeechModal);



 


