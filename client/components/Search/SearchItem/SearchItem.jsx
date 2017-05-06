import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import personalActions from '../../../actions/personalActions.js';
import { setBentoId } from '../../../actions/appActions.js';
import { modalOn } from '../../../actions/voiceActions.js';
import displayActions from './../../../actions/displayActions.js';

const { fetchNoris } = displayActions;

class SearchItem extends Component {
  constructor(props) {
    super(props);
  }
  
  modalAndFetchNori(bentoId){
    this.props.modalOn();
    this.props.fetchNoris(bentoId);
  }

  render() {
    return (
      <div className='search-item col-md-2' key={this.props.key}>
        <div className='searchBox wow bounceInUp'>
          <div className='searchImage'>
            <img className='search-data' src={this.props.item.img_url ? this.props.item.img_url : 'img/no_image.jpg'} />
          </div>
          <div className='caption'>
            <h4 className='search-data tile-title'><strong>{this.props.item.name}</strong></h4>
            <hr className="line-break" />
            <p className='searchDescription search-data'>{this.props.item.description}</p>
            <p className='search-data'><label>View Count:</label> {this.props.item.visit_count} </p>
            <p className='search-data searchBoxButtons'><Link className='btn btn-primary btn-sm' to={'/display/' + this.props.item.id} onClick={() => this.props.setBentoId(this.props.item.id)}><i className="fa fa-eye" aria-hidden="true"></i></Link><button className="speechButton btn btn-success btn-sm" onClick={() => { this.modalAndFetchNori.bind(this, this.props.item.id)(); this.props.setBentoId(this.props.item.id); }}><i className="fa fa-volume-up" aria-hidden="true"></i></button><Link className='btn btn-default btn-sm' to={'/edit'} onClick={() => this.props.handleFetchBentoForEdit(this.props.bento, this.props.item.id, this.props.userId)}><i className="fa fa-pencil" aria-hidden="true"></i></Link></p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    bento: state.editBentoInfo,
  }
}

export default connect(mapStateToProps, { ...personalActions, setBentoId, modalOn, fetchNoris })(SearchItem);