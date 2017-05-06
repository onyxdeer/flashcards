import React, { Component } from 'react';
import Carousel from 'react-slick';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import personalActions from '../../actions/personalActions.js';
import { setBentoId } from '../../actions/appActions.js';
import BrowseItem from './BrowseItem/BrowseItem.jsx';
import Modal from '../Voice/Modal.jsx';


let userId = 1;

class Explore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: 'Personal',
    }

    if (this.props.userId !== 'guest') {
      userId = this.props.userId;
    }

    this.props.fetchPopular(userId);
  }

  render() {
    const settings = {
      accessibility: true,
      autoplay: false,
      className: 'slick-margin',
      dotsClass: 'slick-dots slick-thumb',
      focusOnSelect: true,
      responsive: [ { breakpoint: 800, settings: { slidesToShow: 1 } }, { breakpoint: 1100, settings: { slidesToShow: 2 } }, { breakpoint: 1500, settings: { slidesToShow: 3 } }, { breakpoint: 1900, settings: { slidesToShow: 4 } }, { breakpoint: 2300, settings: { slidesToShow: 5 } }],
      touchMove: true,
      swipe: true,
      swipeToSlide: true,
      infinite: true,
      speed: 300,
      slidesToScroll: 1,
      initialSlide: 0,
      touchMove: true
    };

    return (
      <div>
        <Modal/>
        <div className='row center-block'>
          <div className='create-title'>
            <h1 className='default-font'>Explore Bentos</h1>
          </div>
          <div className='row browseSection'>
            <div className='col-xs-offset-1 col-xs-10 col-xs-offset-1'>

                {
                  this.props.bentos&&(this.props.bentos.length > 0 ) ?

                  (<Carousel {...settings}>
                  {this.props.bentos.map((bento, index) => (
                    <div key={index}>
                      <BrowseItem item={bento} userId={userId} />
                    </div>
                  ))}
                  </Carousel>)
                  : (<div className='exploreItems'><h1>Loading Bentos...</h1></div>)
                }

            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userId: state.appReducer.userId,
    bentos: state.personalReducer.bentos,
    category: state.personalReducer.category
  }
}

export default connect(mapStateToProps, { ...personalActions, setBentoId })(Explore);