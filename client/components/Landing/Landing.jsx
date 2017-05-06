import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import LandingBentos from './LandingBentos.jsx'
import {connect} from 'react-redux'
import * as actions from '../../actions/landingActions.js'
import Modal from '../Voice/Modal.jsx';

class Landing extends Component {
  constructor(props){
    super(props)

    this.state = {
      width: $(window).width(),
      height: $(window).height()
    }

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    this.setState({width: $(window).width(), height: $(window).height()});
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.landing.bentos.length != this.props.landing.bentos.length) {
      var bentoIds = this.props.landing.bentos.map(function(bento){
        return bento.id
      })
      this.props.handleFetchLandingBentoImages(bentoIds)
    }
    return true;
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.props.handleGetAlotBentos();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div>
      <Modal/>
	    <section id="hero-area">
	        <div className="container">
	            <div className="row">
	                <div className="col-md-8">
	                    <div className="block">
                          <h1 className="lp wow animated fadeInDown">Welcome to Obento!</h1>
                          <hr style = {{marginTop: 10}} className= "wow animated slideInLeft"/>
	                        <h2 className="lp wow fadeInDown">Memorization made fun and effortless.</h2>
	                        <p className="lp wow fadeInDown" data-wow-delay="0.3s">Build a new bento (deck) of noris (flashcards) or find one created by others. Then interact seamlessly with your noris by using hands-free voice control!</p>
	                        <div className="wow fadeInDown" data-wow-delay="0.3s">
	                        	<Link to="/edit" className="btn btn-default btn-home" role="button" onClick={()=> {this.props.handleRenderCreatePage()}}>Create Your Own Bento!</Link>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </section>

        <div style= {{display: "flex"}}>
          <div className='column1' style = {{flex:1, display: "flex", flexFlow: "column nowrap"}}>
            {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => {
              if (index % 10 == 0 && this.state.width >= 2560) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if (index % 9 == 0 && this.state.width < 2560 && this.state.width >= 2304) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if (index % 8 == 0 && this.state.width < 2304 && this.state.width >= 2048) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if (index % 7 == 0 && this.state.width < 2048 && this.state.width >= 1792) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if (index % 6 == 0 && this.state.width < 1792 && this.state.width >= 1536) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if (index % 5 == 0 && this.state.width < 1536 && this.state.width >= 1280) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if (index % 4 == 0 && this.state.width < 1280 && this.state.width >= 1024) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if (index % 3 == 0 && this.state.width < 1024 && this.state.width >= 768) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if (index % 2 == 0 && this.state.width < 768 && this.state.width >= 512) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if (this.state.width < 512) {
                return <LandingBentos key={index} bento = {bento}/>
              }
            }) : null}
          </div>
          <div className='column2' style = {{flex: 1, display: "flex", flexFlow: "column nowrap"}}>
            {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => {
              if ((index - 1) % 10 == 0 && this.state.width >= 2560) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 1) % 9 == 0 && this.state.width < 2560 && this.state.width >= 2304) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 1) % 8 == 0 && this.state.width < 2304 && this.state.width >= 2048) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 1) % 7 == 0 && this.state.width < 2048 && this.state.width >= 1792) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 1) % 6 == 0 && this.state.width < 1792 && this.state.width >= 1536) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 1) % 5 == 0 && this.state.width < 1536 && this.state.width >= 1280) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 1) % 4 == 0 && this.state.width < 1280 && this.state.width >= 1024) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 1) % 3 == 0 && this.state.width < 1024 && this.state.width >= 768) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 1) % 2 == 0 && this.state.width < 768 && this.state.width >= 512) {
                return <LandingBentos key={index} bento = {bento}/>
              }
            }) : null}
          </div>
           <div className='column3' style = {{flex:1, display: "flex", flexFlow: "column nowrap"}}>
            {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => {
              if ((index - 2) % 10 == 0 && this.state.width >= 2560) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 2) % 9 == 0 && this.state.width < 2560 && this.state.width >= 2304) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 2) % 8 == 0 && this.state.width < 2304 && this.state.width >= 2048) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 2) % 7 == 0 && this.state.width < 2048 && this.state.width >= 1792) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 2) % 6 == 0 && this.state.width < 1792 && this.state.width >= 1536) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 2) % 5 == 0 && this.state.width < 1536 && this.state.width >= 1280) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 2) % 4 == 0 && this.state.width < 1280 && this.state.width >= 1024) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 2) % 3 == 0 && this.state.width < 1024 && this.state.width >= 768) {
                return <LandingBentos key={index} bento = {bento}/>
              }
            }) : null}
          </div>
          <div className='column4' style = {{flex:1, display: "flex", flexFlow: "column nowrap"}}>
            {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => {
              if ((index - 3) % 10 == 0 && this.state.width >= 2560) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 3) % 9 == 0 && this.state.width < 2560 && this.state.width >= 2304) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 3) % 8 == 0 && this.state.width < 2304 && this.state.width >= 2048) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 3) % 7 == 0 && this.state.width < 2048 && this.state.width >= 1792) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 3) % 6 == 0 && this.state.width < 1792 && this.state.width >= 1536) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 3) % 5 == 0 && this.state.width < 1536 && this.state.width >= 1280) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 3) % 4 == 0 && this.state.width < 1280 && this.state.width >= 1024) {
                return <LandingBentos key={index} bento = {bento}/>
              }
            }) : null}
          </div> 
          <div className='column5' style = {{flex:1, display: "flex", flexFlow: "column nowrap"}}>
            {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => {
              if ((index - 4) % 10 == 0 && this.state.width >= 2560) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 4) % 9 == 0 && this.state.width < 2560 && this.state.width >= 2304) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 4) % 8 == 0 && this.state.width < 2304 && this.state.width >= 2048) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 4) % 7 == 0 && this.state.width < 2048 && this.state.width >= 1792) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 4) % 6 == 0 && this.state.width < 1792 && this.state.width >= 1536) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 4) % 5 == 0 && this.state.width < 1536 && this.state.width >= 1280) {
                return <LandingBentos key={index} bento = {bento}/>
              }
            }) : null}
          </div>
          <div className='column6' style = {{flex:1, display: "flex", flexFlow: "column nowrap"}}>
            {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => {
              if ((index - 5) % 10 == 0 && this.state.width >= 2560) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 5) % 9 == 0 && this.state.width < 2560 && this.state.width >= 2304) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 5) % 8 == 0 && this.state.width < 2304 && this.state.width >= 2048) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 5) % 7 == 0 && this.state.width < 2048 && this.state.width >= 1792) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 5) % 6 == 0 && this.state.width < 1792 && this.state.width >= 1536) {
                return <LandingBentos key={index} bento = {bento}/>
              }
            }) : null}
          </div>
          <div className='column7' style = {{flex:1, display: "flex", flexFlow: "column nowrap"}}>
            {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => {
              if ((index - 6) % 10 == 0 && this.state.width >= 2560) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 6) % 9 == 0 && this.state.width < 2560 && this.state.width >= 2304) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 6) % 8 == 0 && this.state.width < 2304 && this.state.width >= 2048) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 6) % 7 == 0 && this.state.width < 2048 && this.state.width >= 1792) {
                return <LandingBentos key={index} bento = {bento}/>
              }
            }) : null}
          </div>
          <div className='column8' style = {{flex:1, display: "flex", flexFlow: "column nowrap"}}>
            {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => {
              if ((index - 7) % 10 == 0 && this.state.width >= 2560) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 7) % 9 == 0 && this.state.width < 2560 && this.state.width >= 2304) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 7) % 8 == 0 && this.state.width < 2304 && this.state.width >= 2048) {
                return <LandingBentos key={index} bento = {bento}/>
              }
            }) : null}
          </div>
          <div className='column9' style = {{flex:1, display: "flex", flexFlow: "column nowrap"}}>
            {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => {
              if ((index - 8) % 10 == 0 && this.state.width >= 2560) {
                return <LandingBentos key={index} bento = {bento}/>
              } else if ((index - 8) % 9 == 0 && this.state.width < 2560 && this.state.width >= 2304) {
                return <LandingBentos key={index} bento = {bento}/>
              }
            }) : null}
          </div>
          <div className='column10' style = {{flex:1, display: "flex", flexFlow: "column nowrap"}}>
            {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => {
              if ((index - 9) % 10 == 0 && this.state.width >= 2560) {
                return <LandingBentos key={index} bento = {bento}/>
              }
            }) : null}
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
