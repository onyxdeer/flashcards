import React, { Component } from 'react';
import displayActions from '../../../actions/displayActions.js';
import * as appActions from '../../../actions/appActions.js';
import personalActions from '../../../actions/personalActions.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { modalOn } from '../../../actions/voiceActions.js';



class ButtonSection extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className='buttonSection'>
        {(this.props.currentNori === 0) ? <button type='button' className='btn btn-blue-grey' onClick={() => this.props.prevNori(this.props.bentoData, this.props.currentNori, this.props.direction)}>Previous Nori</button> :
          <button type='button' className='btn btn-default' onClick={() => this.props.prevNori(this.props.bentoData, this.props.currentNori, this.props.direction)}>Previous Nori</button>}
          {(this.props.currentNori === this.props.bentoData.length - 1) ? <button type='button' className='btn btn-blue-grey' onClick={() => this.props.nextNori(this.props.bentoData, this.props.currentNori, this.props.direction)}>Next Nori</button> :
          <button type='button' className='btn btn-default' onClick={() => this.props.nextNori(this.props.bentoData, this.props.currentNori, this.props.direction)}>Next Nori</button>}
        <a href='#' className='btn btn-default' id='alert-shuffle' onClick={() => this.props.shuffleNori(this.props.bentoData, this.props.direction)}>Shuffle Bento</a>
        <Link className='btn btn-default' to={'/edit'} onClick={() => this.props.handleFetchBentoForEdit(this.props.bento, (this.props.shortenerId ? this.props.shortenerId : this.props.bentoId), this.props.userId)}>Edit</Link>
        {/*<Link className='btn btn-success' to={'/Voice'}>Voice</Link>*/}
        <button className="btn btn-default" onClick={this.props.modalOn}><i className="fa fa-volume-up" aria-hidden="true"></i></button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bento: state.editBentoInfo,
    bentoId: state.appReducer.bentoId,
    shortenerId: state.appReducer.shortenerId,
    bentoData: state.displayReducer.bentoData,
    direction: state.displayReducer.direction,
    currentNori: state.displayReducer.currentNori,
  }
}

export default connect(mapStateToProps, { ...displayActions, ...appActions, ...personalActions, modalOn })(ButtonSection);

  
