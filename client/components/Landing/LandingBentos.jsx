import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from '../../actions/appActions.js'
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
  render() {
    var bento = this.props.bento
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
        <h4 className="card-title"><strong>{bento.id+'. '}{bento.name}</strong></h4>
        <hr className="landingbento" />
        <p className="card-text">{bento.description}</p>
        <Link to = {'/display'} onClick = {() => this.props.setBentoId(bento.id)} className="btn btn-default btn-rounded waves-effect btn-sm">View</Link>
    </div>
</div>
    )
  }
}
function mapStateToProps(state) {
  return {
    landing: state.landingReducer
  }
}

export default connect(mapStateToProps, actions)(LandingBentos);