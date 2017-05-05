import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from '../../actions/appActions.js'
import { modalOn } from '../../actions/voiceActions.js';
import displayActions from './../../actions/displayActions.js';
import personalActions from './../../actions/personalActions.js';

const { fetchNoris } = displayActions;

    var wowAnimation = [
    // "wow landing-bento animated bounce",
    // "wow landing-bento animated flash",
    // "wow landing-bento animated pulse", 
    // "wow landing-bento animated rubberBand", 
    // "wow landing-bento animated shake",
    // "wow landing-bento animated headShake",
    // "wow landing-bento animated swing",
    // "wow landing-bento animated tada",
    // "wow landing-bento animated wobble",
    // "wow landing-bento animated jello",
    "wow landing-bento animated bounceIn", 
    // "wow landing-bento animated bounceInUp", 
    // "wow landing-bento animated bounceInLeft",
    // "wow landing-bento animated bounceInRight",
    // "wow landing-bento animated fadeIn",
    // "wow landing-bento animated fadeInLeft",
    // "wow landing-bento animated fadeInLeftBig",
    // "wow landing-bento animated flipInX",
    // "wow landing-bento animated flipInY",
    // "wow landing-bento animated lightSpeedIn",
    // "wow landing-bento animated rotateIn", 
    // "wow landing-bento animated rotateInUpLeft", 
    // "wow landing-bento animated rotateInUpRight",
    // "wow landing-bento animated rollIn",
    // "wow landing-bento animated zoomIn",
    // "wow landing-bento animated zoomInLeft",
    // "wow landing-bento animated zoomInRight",
    // "wow landing-bento animated zoomInUp",
    // "wow landing-bento animated slideInLeft",
    // "wow landing-bento animated slideInRight",
    // "wow landing-bento animated slideInUp"
    ]


class LandingBentos extends Component {
  constructor(props) {
    super(props) 
  }
  
  modalAndFetchNori(bentoId){
    this.props.modalOn();
    this.props.fetchNoris(bentoId);
  }

  render() {
    var bento = this.props.bento
    console.log('what are props in landingbentos: ', this.props)
    // var animationNumber = Math.floor(Math.random()*6);
    return (
<div className = {wowAnimation[0]} data-wow-delay = "0.4s" data-wow-duration="1.5s" style = {{display: 'flex', flexDirection: 'column', justifyContent:'space-between', flexGrow: 0, flexShrink: 0}}>
    <div className="view overlay hm-white-slight">
      {this.props.landing.images ? 
        this.props.landing.images[bento.id] ?
        <img src={this.props.landing.images[bento.id][0]} className="img-fluid" alt=""/> : null : null
      }
            <div className="mask waves-effect waves-light"></div>
    </div>
    <div className="card-block">
        <h4 className="card-title"><strong>{bento.name}</strong></h4>
        <hr className="line-break" />
        <p className="card-text">{bento.description}</p>
        <p className='exploreItems'><label>View Count:</label> {bento.visit_count} </p>
        <div className='landingButtons'>
          <Link to = {'/display'} onClick = {() => this.props.setBentoId(bento.id)} className="btn btn-primary btn-sm"><i className="fa fa-eye" aria-hidden="true"></i></Link>
          <button className="speechButton btn btn-success btn-sm" onClick={this.modalAndFetchNori.bind(this, bento.id)}><i className="fa fa-volume-up" aria-hidden="true"></i></button>
          <Link className='btn btn-default btn-sm' to={'/edit'} onClick={() => this.props.handleFetchBentoForEdit(this.props.bentoToEdit, bento.id, this.props.userId === 'guest' ? 1 : this.props.userId)}><i className="fa fa-pencil" aria-hidden="true"></i></Link>
        </div>
    </div>
</div>
    )
  }
}
function mapStateToProps(state) {
  return {
    userId: state.appReducer.userId,
    bentoToEdit: state.editBentoInfo,
    landing: state.landingReducer
  }
}

export default connect(mapStateToProps, { ...actions, ...personalActions, modalOn, fetchNoris})(LandingBentos);