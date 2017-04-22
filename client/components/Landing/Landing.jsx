import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import LandingBentos from './LandingBentos.jsx'
import {connect} from 'react-redux'
import * as actions from '../../actions/landingActions.js'

var partOne = function() {
  var imageRepository = new function () {
  this.background = new Image(); 
  this.spaceship = new Image();
  this.bullet = new Image();
  var numImages = 3;
  var numLoaded = 0;
  function imageLoaded () {
    numLoaded++;
    if(numLoaded === numImages) {
      if(game.init()){
        game.start();
      }
    }
  }
  this.background.onload = function() {
    imageLoaded();
  } 
  this.spaceship.onload = function() {
    imageLoaded();
  }
  this.bullet.onload = function() {
    imageLoaded();
  }
  this.background.src = "http://i.imgur.com/gaoTZJX.png"
  this.spaceship.src = "https://raw.githubusercontent.com/wichew/galaxian-canvas-game/master/part2/imgs/ship.png"
  this.bullet.src = "https://raw.githubusercontent.com/wichew/galaxian-canvas-game/master/part2/imgs/bullet.png"
}

function Drawable () {
  this.init = function(x , y, width, height) {
    this.x = x;
    this.y = y;
  }
  this.speed = 0;
  this.canvasWidth = width;
  this.canvasHeight = height;

  this.draw = function(){

  };
}

function Background() {
  this.speed = 1;
  this.draw = function() {
    this.y += this.speed;
    this.context.drawImage(imageRepository.background, this.x, this.y);
    this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);
    if(this.y >= this.canvasHeight){
      this.y = 0
    }
  }
}

Background.prototype = new Drawable();

function Game() {
  this.init = function() {
    this.bgCanvas = document.getElementById('background');
    if(this.bgCanvas.getContext) {
      this.bgContext = this.bgCanvas.getContext('2d');
      Background.prototype.context = this.bgContext;
      Background.prototype.canvasWidth = this.bgCanvas.width;
      Background.prototype.canvasHeight = this.bgCanvas.height;
      this.background = new Background();
      this.background.init(0, 0);
      return true;
    } else {
      return false;
    }
  }
  this.start = function () {
    animate();
  }
}

function animate() {
  requestAnimFrame(animate);
  game.background.draw();
}

window.requestAnimFrame = (function(){
  return window.requestAnimationFrame 
  // || function(callback, element) {
  //   window.setTimeout(callback, 1000 / 60);}
})();

function Pool(maxSize) {
  var size = maxSize;
  var pool = [];
}

var game = new Game(); 

}
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
    // partOne();
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
                          <h1 className="lp wow fadeInDown">Welcome to Obento!</h1>
                          <hr style = {{marginTop: 10}} className= "wow animated slideInLeft"/>
	                        <h2 className="lp wow fadeInDown">A Fun Modern Day Memorization Service</h2>
	                        <p className="lp wow fadeInDown" data-wow-delay="0.3s">Get started by creating a bento - deck - of noris ("nor - reez'') - cards - right now!</p>
	                        <div className="wow fadeInDown" data-wow-delay="0.3s">
	                        	< Link to="/edit" className="btn btn-default btn-home"  role="button">Create Your Own Bento!</Link>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </section>
        <div id = "bento-area" style = {{position: 'relative'}}>
          {this.props.landing.bentos ? this.props.landing.bentos.map((bento, index) => <LandingBentos key={index} bento = {bento}/>) : null}
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