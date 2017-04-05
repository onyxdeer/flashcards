import React, { Component } from 'react';
import Deck from 'react-deck';
import Card from 'react-card';
import Carousel from 'react-slick';
import CarouselTheme from 'slick-carousel';
import axios from 'axios';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "User's",
      userBentos: [{
        title: 'Userbento 1',
        description: 'This is user bento 1',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'User1 Front 1',
          back: 'User1 Back 1',
          // isFlipped: false
        }, {
          front: 'User1 Front 2',
          back: 'User1 Back 2',
          // isFlipped: false
        }, {
          front: 'User1 Front 3',
          back: 'User1 Back 3',
          // isFlipped: false
        }]
      }, {
        title: 'Userbento 2',
        description: 'This is user bento 2',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'User2 Front 1',
          back: 'User2 Back 1',
          // isFlipped: false
        }, {
          front: 'User2 Front 2',
          back: 'User2 Back 2',
          // isFlipped: false
        }, {
          front: 'User2 Front 3',
          back: 'User2 Back 3',
          // isFlipped: false
        }]
      }, {
        title: 'Userbento 3',
        description: 'This is user bento 3',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'User3 Front 1',
          back: 'User3 Back 1',
          // isFlipped: false
        }, {
          front: 'User3 Front 2',
          back: 'User3 Back 2',
          // isFlipped: false
        }, {
          front: 'User3 Front 3',
          back: 'User3 Back 3',
          // isFlipped: false
        }]
      }],
      favoriteBentos: [{
        title: 'FavoriteBento 1',
        description: 'This is favorite bento 1',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'Favorite1 Front 1',
          back: 'Favorite1 Back 1',
          // isFlipped: false
        }, {
          front: 'Favorite1 Front 2',
          back: 'Favorite1 Back 2',
          // isFlipped: false
        }, {
          front: 'Favorite1 Front 3',
          back: 'Favorite1 Back 3',
          // isFlipped: false
        }]
      }, {
        title: 'FavoriteBento 2',
        description: 'This is favorite bento 2',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'Favorite2 Front 1',
          back: 'Favorite2 Back 1',
          // isFlipped: false
        }, {
          front: 'Favorite2 Front 2',
          back: 'Favorite2 Back 2',
          // isFlipped: false
        }, {
          front: 'Favorite2 Front 3',
          back: 'Favorite2 Back 3',
          // isFlipped: false
        }]
      }, {
        title: 'FavoriteBento 3',
        description: 'This is favorite bento 3',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'Favorite3 Front 1',
          back: 'Favorite3 Back 1',
          // isFlipped: false
        }, {
          front: 'Favorite3 Front 2',
          back: 'Favorite3 Back 2',
          // isFlipped: false
        }, {
          front: 'Favorite3 Front 3',
          back: 'Favorite3 Back 3',
          // isFlipped: false
        }]
      }],
      popularBentos: [{
        title: 'PopularBento 1',
        description: 'This is popular bento 1',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'Popular1 Front 1',
          back: 'Popular1 Back 1',
          // isFlipped: false
        }, {
          front: 'Popular1 Front 2',
          back: 'Popular1 Back 2',
          // isFlipped: false
        }, {
          front: 'Popular1 Front 3',
          back: 'Popular1 Back 3',
          // isFlipped: false
        }]
      }, {
        title: 'PopularBento 2',
        description: 'This is popular bento 2',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'Popular2 Front 1',
          back: 'Popular2 Back 1',
          // isFlipped: false
        }, {
          front: 'Popular2 Front 2',
          back: 'Popular2 Back 2',
          // isFlipped: false
        }, {
          front: 'Popular2 Front 3',
          back: 'Popular2 Back 3',
          // isFlipped: false
        }]
      }, {
        title: 'PopularBento 3',
        description: 'This is popular bento 3',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'Popular3 Front 1',
          back: 'Popular3 Back 1',
          // isFlipped: false
        }, {
          front: 'Popular3 Front 2',
          back: 'Popular3 Back 2',
          // isFlipped: false
        }, {
          front: 'Popular3 Front 3',
          back: 'Popular3 Back 3',
          // isFlipped: false
        }]
      }],
      bentosToDisplay: []
    }

    this.fetchPersonal = this.fetchPersonal.bind(this);
    this.fetchFavorites = this.fetchFavorites.bind(this);
    this.fetchPopular = this.fetchPopular.bind(this);
    // this.getSortedNoris = this.getSortedNoris.bind(this);
  }

  fetchPersonal() {
    this.setState({
      category: "User's"
    });
    // do a GET PERSONAL api to DB
    this.setState({
      bentosToDisplay: this.state.userBentos
    }, () => { Carousel.slickGoTo(0) } );
  }

  fetchFavorites() {
    this.setState({
      category: "Favorite"
    });
    // do a GET FAVORITES api to DB
    this.setState({
      bentosToDisplay: this.state.favoriteBentos
    }, () => { Carousel.slickGoTo(0) } );
  }

  fetchPopular() {
    this.setState({
      category: "Most Popular"
    });
    // do a GET POPULAR api to DB
    this.setState({
      bentosToDisplay: this.state.popularBentos
    }, () => { Carousel.slickGoTo(0) } );
  }

  // getSortedNoris () {
  //   let stackSize = this.state.mockData.bento.length >= 10 ? 10 : this.state.mockData.bento.length;
  //   return this.state.mockData.bento
  //     .slice(this.state.currentNori)
  //     .concat(this.state.mockData.bento.slice(0, this.state.currentNori))
  //     .slice(0, stackSize) // for performance
  //     .reverse();
  // }

  componentWillMount() {
    // send an DB GET request for the flash cards here
    this.setState({
      bentosToDisplay: this.state.userBentos
    });
  }

  render() {
    const settings = {
      arrows: true,
      accessibility: true,
      autoplay: false,
      centerMode: true,
      className: 'slick-margin',
      dotsClass: 'slick-dots slick-thumb',
      focusOnSelect: true,
      responsive: [ { breakpoint: 550, settings: { slidesToShow: 1 } }, { breakpoint: 1100, settings: { slidesToShow: 2 } }, { breakpoint: 1500, settings: { slidesToShow: 3 } }],
      touchMove: true,
      swipe: true,
      swipeToSlide: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };

    return (
      <div>
        <div className='row center-block'>
          <div className='create-title'>
            <h1>{this.state.category} Bentos:</h1>
          </div>
          <div className='row buttonSection'>
            <label>Categories:</label>
            <button type='button' className='btn btn-success' onClick={this.fetchPersonal}>Personal</button>
            <button type='button' className='btn btn-success' onClick={this.fetchFavorites}>Favorites</button>
            <button type='button' className='btn btn-success' onClick={this.fetchPopular}>Popular</button>
          </div>
          <div className='row'>
            <Carousel {...settings}>   
                  {this.state.bentosToDisplay.map((data, index) => (
                    <div data-index={index} key={index}>
                      <div className='container col-md-12'>
                        <div className='carousel-card index-card'>
                            <div className='card-front'>
                              <p>{data.bento[0].front}</p>
                            </div>
                        </div>
                      </div>
                    </div> ))}
            </Carousel>
          </div>
        </div>
      </div>
    )
  }
}

export default User;