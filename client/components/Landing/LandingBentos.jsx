import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from '../../actions/appActions.js'


class LandingBentos extends Component {
  constructor(props) {
    super(props) 
  }

  render() {
    console.log(this.props.landing)
    var bento = this.props.bento
    return (
<div className="wow landing-bento animated bounceIn" style = {{flexBasis:'auto'}}>
    <div className="view overlay hm-white-slight">
      {this.props.landing.images ? 
        this.props.landing.images[bento.id] ?
        <img src={this.props.landing.images[bento.id][0]} className="img-fluid" alt=""/> : null : null
      }
            <div className="mask waves-effect waves-light"></div>
    </div>
    <div className="card-block">
        <h4 className="card-title">{bento.name + bento.id}</h4>
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