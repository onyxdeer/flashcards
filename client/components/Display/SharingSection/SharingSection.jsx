import React, { Component } from 'react';
import displayActions from '../../../actions/displayActions.js';
import { connect } from 'react-redux';
import PhoneNumberModal from './PhoneNumberModal/PhoneNumberModal.jsx';

let userId = 1;

class SharingSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='sharingSpace'>
        <div className='row sharingSpace'>
          <div className='sharingSection'>
            <label>Share this bento with the following link!</label><span>  </span><input type='text' className='shortenURLField' value={`obento.fun/id=${this.props.id_hash}`} readOnly />
            <button type='button' className='btn btn-default' data-toggle='modal' data-target='#sendSMS' onClick={this.props.clearPhoneNumberInput}>Send via SMS</button>
          </div>
        </div>
        <PhoneNumberModal />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id_hash: state.displayReducer.id_hash,
  }
}

export default connect(mapStateToProps, { ...displayActions })(SharingSection);