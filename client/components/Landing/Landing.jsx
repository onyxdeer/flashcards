import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import LandingBentos from './LandingBentos.jsx'
import {connect} from 'react-redux'
import * as actions from '../../actions/landingActions.js'

class Landing extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log("Yo 105 componentDidReceiveProps",prevProps , this.props)
    if(prevProps.landing.bentos.length != this.props.landing.bentos.length) {
      var bentoIds = this.props.landing.bentos.map(function(bento){
        return bento.id
      })
      this.props.handleFetchLandingBentoImages(bentoIds)
    }
    return true;
  }
  componentDidMount() {
    this.props.handleGetAlotBentos();
  }

  render() {
    return (
      <div>
	    <section id="hero-area">
	        <div className="container">
	            <div className="row">
	                <div className="col-md-8">
	                    <div className="block">
                          <h1 className="lp wow animated fadeInDown">Welcome to Obento!</h1>
                          <hr style = {{marginTop: 10}} className= "wow animated slideInLeft"/>
	                        <h2 className="lp wow fadeInDown">Memorization made fun and effortless.</h2>
	                        <p className="lp wow fadeInDown" data-wow-delay="0.3s">Get started by creating a bento of noris, then interact seamlessly with your noris by using hands-free voice control!</p>
	                        <div className="wow fadeInDown" data-wow-delay="0.3s">
	                        	< Link to="/edit" className="btn btn-default btn-home"  role="button">Create Your Own Bento!</Link>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </section>
        <div style= {{display: "flex"}}>
          <div style = {{flex:1, display: "flex", flexFlow: "column nowrap"}}>
                       {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => {
            if(index % 5 == 0){
            return <LandingBentos key={index} bento = {bento}/>
            }}) : null}
          </div>
          <div style = {{flex: 1, display: "flex", flexFlow: "column nowrap"}}>
                      {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => {
            if((index - 1) % 5 == 0){
            return <LandingBentos key={index} bento = {bento}/>
            }}) : null}
          </div>
           <div style = {{flex:1, display: "flex", flexFlow: "column nowrap"}}>
                       {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => {
            if((index - 2) % 5== 0){
            return <LandingBentos key={index} bento = {bento}/>
            }}) : null}
          </div>
          <div style = {{flex:1, display: "flex", flexFlow: "column nowrap"}}>
                       {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => {
            if((index - 3) % 5 == 0){
            return <LandingBentos key={index} bento = {bento}/>
            }}) : null}
          </div> 
          <div style = {{flex:1, display: "flex", flexFlow: "column nowrap"}}>
                       {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => {
            if((index - 4) % 5 == 0){
            return <LandingBentos key={index} bento = {bento}/>
            }}) : null}
          </div>   
        </div>
            {/*<div  style = {{position: 'relative'}}>
              <canvas id="background" width="600" height="360" style = {{
                position: 'absolute',
                top: 0,
                left: 0,
                background: 'transparent'
              }}>
              </canvas>
                            <canvas id="main" width="600" height="360" style = {{
                position: 'absolute',
                top: 0,
                left: 0,
                background: 'transparent'
              }}>
              </canvas>
                            <canvas id="ship" width="600" height="360" style = {{
                position: 'absolute',
                top: 0,
                left: 0,
                background: 'transparent'
              }}>
              </canvas>
            </div>*/}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    landing: state.landingReducer
  }
}

export default connect(mapStateToProps, {...actions})(Landing);
