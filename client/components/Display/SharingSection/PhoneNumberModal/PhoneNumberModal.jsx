import React, { Component } from 'react';
import displayActions from '../../../../actions/displayActions.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

let userId = 1;

class PhoneNumberModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='modal fade' id='sendSMS' tabIndex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h3 className='modal-title' id='exampleModalLabel'>Share via SMS</h3>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form id='smsForm' onSubmit={(event) => this.props.shareUrlToSMS(event, `http://obento.fun/id=${this.props.id_hash}`, this.props.phoneNumberInput)}>
                <div className='form-group'>
                  <label className='form-control-label'>Recipient's Phone Number:</label>
                  <input type='tel' className='form-control' id='recipient-name' value={this.props.phoneNumberInput} placeholder='14151234567' onChange={(event) => this.props.handlePhoneNumberInput(event)} />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
              <button type='button' id='alert-target' className='btn btn-primary' onClick={(event) => this.props.shareUrlToSMS(event, `http://obento.fun/id=${this.props.id_hash}`, this.props.phoneNumberInput)} data-dismiss='modal'>Share</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id_hash: state.displayReducer.id_hash,
    phoneNumberInput: state.displayReducer.phoneNumberInput,
  }
}

export default connect(mapStateToProps, { ...displayActions })(PhoneNumberModal);