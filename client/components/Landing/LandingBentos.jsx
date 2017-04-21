import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from '../../actions/appActions.js'

class LandingBentos extends Component {
  constructor(props) {
    super(props) 
  }

  render() {
    console.log(this.props)
    var bento = this.props.bento
    return (
<div className="wow landing-bento col-md-2 animated bounceIn">
    <div className="view overlay hm-white-slight">

        <img src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%287%29.jpg" className="img-fluid" alt=""/>
            <div className="mask waves-effect waves-light"></div>
    </div>
    <div className="card-block">
        <h4 className="card-title">{bento.name}</h4>
        <hr className="landingbento" />
        <p className="card-text">{bento.description}</p>
        <Link to = {'/display'} onClick = {() => this.props.setBentoId(bento.id)} className="btn btn-primary">View</Link>
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