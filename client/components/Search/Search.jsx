import React, { Component } from 'react';
// import Carousel from 'react-slick';

class Search extends Component {
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

  componentWillMount() {
    this.props.endNavSubmit();
    // send an DB GET request for the flash cards here
    axios.get('/api/bentos', {
      params: {
        name: this.props.query
      }
    }).then(function(response) {
      console.log('RESPONSE BACK FROM DB:', response);
    }).then(this.setState({
      bentosToDisplay: this.state.userBentos
    }));    
  }


  render() {

    console.log('Rendering Search');

    return (
      <div>
        <div className='row center-block searchSection'>
          <div><h1>Search Results for: {this.props.query}</h1></div>
          <div className='thumbnails'>
          </div>
        </div>
      </div>
    )
  }
}

export default Search;