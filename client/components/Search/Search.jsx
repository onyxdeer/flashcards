import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      }, {
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
      }, {
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
  }

  componentWillMount() {
    this.props.endNavSubmit();
    // send an DB GET request for the flash cards here
    axios.get('/api/bentos', {
      params: {
        name: this.props.keyword
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
          <div className='filterSection'>
            Filter By: <span>
              <button type='button' className='btn btn-success'>Name</button>
              <button type='button' className='btn btn-success'>Views</button>
              <button type='button' className='btn btn-success'>Rating</button>
              <button type='button' className='btn btn-success'>Date Created</button>
              <button type='button' className='btn btn-success'>Recently Updated</button>
            </span>
          </div>
          <div className='row'>
              <div className='center-block col-xs-12 col-md-12'>
                {this.state.bentosToDisplay.map((data, index) => (
                <div className='col-xs-4 col-md-4' data-index={index} key={index}>
                    <div className='search-card index-card'>
                      <div className='card-front'>
                        <p>{data.bento[0].front}</p>
                      </div>
                    </div>
                    <div className='bento-metadata'>
                      <div>{data.title}</div>
                      <div>{data.description}</div>
                    </div>
                </div> ))}
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Search;