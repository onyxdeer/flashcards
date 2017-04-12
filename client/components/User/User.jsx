import React, { Component, PropTypes } from 'react';
import Carousel from 'react-slick';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import personalActions from '../../actions/personalActions.jsx';
import handleFetchBentoForEdit from '../../actions/editPageActions.js'


let userId = 1;

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: 'Personal',
    }

    if (this.props.userId !== 'guest') {
      userId = this.props.userId;
    }

    this.props.fetchUser(userId);
  }

  render() {
    console.log('bentos in User page render:', this.props.bentos);
    const settings = {
      accessibility: true,
      autoplay: false,
      className: 'slick-margin',
      dotsClass: 'slick-dots slick-thumb',
      focusOnSelect: true,
      responsive: [ { breakpoint: 550, settings: { slidesToShow: 1 } }, { breakpoint: 1100, settings: { slidesToShow: 2 } }, { breakpoint: 1500, settings: { slidesToShow: 3 } }],
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
console.log("Line 46 User.jsx,", this.props.bentos)
    return (
      <div>
        <div className='row center-block'>
          <div className='create-title'>
            <h1 className='default-font'>{this.state.category} Bentos:</h1>
          </div>
          <div className='row buttonSection'>
            <label>Categories:</label>
            <button type='button' className='btn btn-success' onClick={() => this.props.fetchUser(userId)}>Personal</button>
            <button type='button' className='btn btn-success' onClick={() => this.props.fetchFavorites(userId)}>Favorites</button>
            <button type='button' className='btn btn-success' onClick={this.props.fetchPopular}>Popular</button>
          </div>
          <div className='row'>
            <div className='col-xs-1'></div>
            <div className='col-xs-10'>
                
                {
                  this.props.bentos&&(this.props.bentos.length > 0 ) ? 

                  (<Carousel {...settings}> 
                  {this.props.bentos.map((bento, index) => (
                    <div className='thumbnail' key={index}>
                      <img src={bento.img_url ? bento.img_url : 'img/no_image.jpg'} />
                      <div className='caption'>
                        <h3>{bento.name}</h3>
                        <p className='ellipsis'>{bento.description}</p>
                        <p><label>View Count:</label> {bento.visit_count} </p>
                        <p><Link className='btn btn-primary' to={'/display'} onClick={() => this.props.setBentoId(bento.id)}>View</Link><span>   </span><button className='btn btn-default' onClick={() => this.props.handleFetchBentoForEdit(this.props.bento,bento.id, 1)} ><Link to={'/edit'} className='btn btn-default'>Edit</Link></button></p>
                      </div>
                    </div>
                  ))}
                  </Carousel>)
                  : (<div><h1 className='center-block'>No bentos have been made yet for this category. Go start creating!</h1></div>)
                }
              
            </div>
            <div className='col-xs-1'></div>
          </div>
        </div>
      </div>
    )
  }
}
 
function mapStateToProps (state) {
  return {
    bentos: state.personalReducer,
    bento: state.editBentoInfo
  }
}

export default connect(mapStateToProps, personalActions)(User);
