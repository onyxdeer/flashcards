import React, { Component } from 'react';
// import Carousel from 'react-slick';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userBentos: [{
        title: 'Userbento 1',
        description: 'This is mock data',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'User Front 1',
          back: 'Back 1',
          // isFlipped: false
        }, {
          front: 'Front 2',
          back: 'Back 2',
          // isFlipped: false
        }, {
          front: 'Front 3',
          back: 'Back 3',
          // isFlipped: false
        }]
      }, {
        title: 'Userbento 2',
        description: 'This is mock data',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'User Front 1',
          back: 'Back 1',
          // isFlipped: false
        }, {
          front: 'Front 2',
          back: 'Back 2',
          // isFlipped: false
        }, {
          front: 'Front 3',
          back: 'Back 3',
          // isFlipped: false
        }]
      }, {
        title: 'Userbento 3',
        description: 'This is mock data',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'Front 1',
          back: 'Back 1',
          // isFlipped: false
        }, {
          front: 'Front 2',
          back: 'Back 2',
          // isFlipped: false
        }, {
          front: 'Front 3',
          back: 'Back 3',
          // isFlipped: false
        }]
      }]
    }
  }



  render() {
    return (
      <div>
        <div className='row center-block userBentos'>
          <div><h1>User Bentos:</h1></div>
          <div className='thumbnails'>
          </div>
        </div>
        <div className='row center-block favoriteBentos'>
          <div><h1>Favorite Bentos:</h1></div>
          <div className='thumbnails'>
          </div>
        </div>
        <div className='row center-block popularBentos'>
          <div><h1>Popular Bentos:</h1></div>
          <div className='thumbnails'>
          </div>
        </div>
      </div>
    )
  }
}

export default User;