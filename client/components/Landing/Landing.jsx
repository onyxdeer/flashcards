import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'
import * as actions from '../../actions/landingActions.js'
import {setBentoId} from '../../actions/appActions.js'

class Landing extends Component {

  componentDidMount() {
    this.props.handleGetAlotBentos()
  }


  render() {
    console.log(this.props.landing)
    return (
      <div>
	    <section id="hero-area">
	        <div className="container">
	            <div className="row">
	                <div className="col-md-8">
	                    <div className="block">
                          <h1 className="wow fadeInDown">Welcome to Obento!</h1>
	                        <h2 className="wow fadeInDown">A Fun Modern Day Memorization Service</h2>
	                        <p className="wow fadeInDown" data-wow-delay="0.3s">Get started by creating a bento - deck - of noris ("nor - reez'') - cards - right now!</p>
	                        <div className="wow fadeInDown" data-wow-delay="0.3s">
	                        	< Link to="/edit"><a className="btn btn-default btn-home"  role="button">Create Your Own Bento!</a></Link>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </section>
      <section id = "bento-area">
        {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => <Link to = "/display" onClick = {() => this.props.setBentoId(bento.id)} key = {index}><div className = "landing-nori col-md-3"  >{bento.name}</div></Link>) : null}

      </section>


      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    landing: state.landingReducer
  }
}

export default connect(mapStateToProps, {...actions, setBentoId})(Landing);