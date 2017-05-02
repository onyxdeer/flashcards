import React, { Component } from 'react';
import Carousel from 'react-slick';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import personalActions from '../../actions/personalActions.js';
import { setBentoId } from '../../actions/appActions.js';
import BrowseItem from './BrowseItem/BrowseItem.jsx';


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
      responsive: [ { breakpoint: 800, settings: { slidesToShow: 1 } }, { breakpoint: 1100, settings: { slidesToShow: 2 } }, { breakpoint: 1500, settings: { slidesToShow: 3 } }],
      touchMove: true,
      swipe: true,
      swipeToSlide: true,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      touchMove: true
    };
    
    return (
      <div>
        <div className='row center-block'>
          <div className='create-title'>
            <h1 className='default-font'>Explore Bentos</h1>
          </div>
          <div className='row'>
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
                  : (<div className='center-block'><h1>Loading Bentos...</h1></div>)
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

        /*<div className='thumbnailSpace wow bounceInDown' key={index}>
          <span className='thumbnail'>
            <img src={bento.img_url ? bento.img_url : 'img/no_image.jpg'} />
            <div className='caption exploreItems'>
              <h3 className='browse-title'>{bento.name}</h3>
              <p className='bentoDescription exploreItems'>{bento.description}</p>
              <p className='exploreItems'><label>View Count:</label> {bento.visit_count} </p>
              <p className='exploreItems'><Link className='btn btn-primary' to={'/display'} onClick={() => this.props.setBentoId(bento.id)}>View</Link><span>   </span><Link className='btn btn-default' to={'/edit'} onClick={() => this.props.handleFetchBentoForEdit(this.props.bento, bento.id, userId)}>Edit</Link></p>
            </div>
          </span>
        </div>*/