import React, { Component } from 'react';
import Carousel from 'react-slick';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import personalActions from '../../../actions/personalActions.js';
import { setBentoId } from '../../../actions/appActions.js';
import { modalOn } from '../../../actions/voiceActions.js';
import displayActions from './../../../actions/displayActions.js';

const { fetchNoris } = displayActions;

class BrowseItem extends Component {
  constructor(props) {
    super(props);
  }

  modalAndFetchNori(bentoId){
    this.props.modalOn();
    this.props.fetchNoris(bentoId);
  }

  render() {
    return (
      <div className='thumbnailSpace wow bounceInDown'>
        <span className='thumbnail'>
          <img src={this.props.item.img_url ? this.props.item.img_url : 'img/no_image.jpg'} />
          <div className='caption exploreItems'>
            <h3 className='browse-title'>{this.props.item.name}</h3>
            <p className='bentoDescription exploreItems'>{this.props.item.description}</p>
            <p className='exploreItems'><label>View Count:</label> {this.props.item.visit_count} </p>
            <p className='exploreItems'><Link className='btn btn-primary' to={'/display'} onClick={() => this.props.setBentoId(this.props.item.id)}><i className="fa fa-eye" aria-hidden="true"></i></Link><span>   </span><Link className='btn btn-default' to={'/edit'} onClick={() => this.props.handleFetchBentoForEdit(this.props.bento, this.props.item.id, this.props.userId)}><i className="fa fa-pencil" aria-hidden="true"></i></Link></p>
            <button className="speechButton btn btn-success" onClick={this.modalAndFetchNori.bind(this, this.props.item.id)}><i className="fa fa-volume-up" aria-hidden="true"></i></button>
          </div>
        </span>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    bento: state.editBentoInfo,
  }
}

export default connect(mapStateToProps, { ...personalActions, setBentoId, modalOn, fetchNoris })(BrowseItem);