import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        }, {
          front: 'User1 Front 2',
          back: 'User1 Back 2',
        }, {
          front: 'User1 Front 3',
          back: 'User1 Back 3',
        }]
      }, {
        title: 'Userbento 2',
        description: 'This is user bento 2',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'User2 Front 1',
          back: 'User2 Back 1',
        }, {
          front: 'User2 Front 2',
          back: 'User2 Back 2',
        }, {
          front: 'User2 Front 3',
          back: 'User2 Back 3',
        }]
      }, {
        title: 'Userbento 3',
        description: 'This is user bento 3',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'User3 Front 1',
          back: 'User3 Back 1',
        }, {
          front: 'User3 Front 2',
          back: 'User3 Back 2',
        }, {
          front: 'User3 Front 3',
          back: 'User3 Back 3',
        }]
      }, {
        title: 'FavoriteBento 1',
        description: 'This is favorite bento 1',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'Favorite1 Front 1',
          back: 'Favorite1 Back 1',
        }, {
          front: 'Favorite1 Front 2',
          back: 'Favorite1 Back 2',
        }, {
          front: 'Favorite1 Front 3',
          back: 'Favorite1 Back 3',
        }]
      }, {
        title: 'FavoriteBento 2',
        description: 'This is favorite bento 2',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'Favorite2 Front 1',
          back: 'Favorite2 Back 1',
        }, {
          front: 'Favorite2 Front 2',
          back: 'Favorite2 Back 2',
        }, {
          front: 'Favorite2 Front 3',
          back: 'Favorite2 Back 3',
        }]
      }, {
        title: 'FavoriteBento 3',
        description: 'This is favorite bento 3',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'Favorite3 Front 1',
          back: 'Favorite3 Back 1',
        }, {
          front: 'Favorite3 Front 2',
          back: 'Favorite3 Back 2',
        }, {
          front: 'Favorite3 Front 3',
          back: 'Favorite3 Back 3',
        }]
      }, {
        title: 'PopularBento 1',
        description: 'This is popular bento 1',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'Popular1 Front 1',
          back: 'Popular1 Back 1',
        }, {
          front: 'Popular1 Front 2',
          back: 'Popular1 Back 2',
        }, {
          front: 'Popular1 Front 3',
          back: 'Popular1 Back 3',
        }]
      }, {
        title: 'PopularBento 2',
        description: 'This is popular bento 2',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'Popular2 Front 1',
          back: 'Popular2 Back 1',
        }, {
          front: 'Popular2 Front 2',
          back: 'Popular2 Back 2',
        }, {
          front: 'Popular2 Front 3',
          back: 'Popular2 Back 3',
        }]
      }, {
        title: 'PopularBento 3',
        description: 'This is popular bento 3',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'Popular3 Front 1',
          back: 'Popular3 Back 1',
        }, {
          front: 'Popular3 Front 2',
          back: 'Popular3 Back 2',
        }, {
          front: 'Popular3 Front 3',
          back: 'Popular3 Back 3',
        }]
      }],
      bentosToDisplay: [],

    }

    this.fetchBentos = this.fetchBentos.bind(this);
  }

  fetchBentos() {
    var context = this;
      // console.log('Calling fetchBentos with keyword:', this.props.query);
      axios.get('/api/bentos', {
        params: { name: this.props.query }
      }).then(function(response) {
        // console.log('response.data:', response.data);
        for (var index = 0; index < response.data.length; index++) {
          
          // Check if it is private
          if (!response.data[index].private) {
            var bento = {};
            // console.log('bento id:', response.data[index].id);
            bento.id = response.data[index].id;
            bento.name = response.data[index].name;
            bento.description = response.data[index].description;
            bento.visit_count = response.data[index].visit_count;
            axios.get('/api/thumbnails', {
              params: { bento_id: response.data[index].id }
            })
            .then(function(response) {
              bento.img_url = response.data.url;
              context.setState({
                bentosToDisplay: context.state.bentosToDisplay.concat([bento])
              });
            });
          }

        }
      });
  }

  componentWillMount() {
    this.props.endNavSubmit();
    this.fetchBentos();
  }

  render() {

    console.log('bentosToDisplay in render:', this.state.bentosToDisplay);

    return (
      <div>
        <div className='row center-block searchSection'>

          {/* Header */}
          <div>
            <h1>Search Results for: {this.props.query}</h1>
          </div>

          {/* Filter bar */}
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
            <div className='center-block col-sm-6 col-md-4'>

            {/*Search results*/}
              {
                this.state.bentosToDisplay.length > 0 ? this.state.bentosToDisplay.map((bento, index) => (
                  <div className='thumbnail' key={index}>
                    <img src={bento.img_url ? bento.img_url : 'img/no_image.jpg'} />
                    <div className='caption'>
                      <h3>{bento.name}</h3>
                      <p className='ellipsis'>{bento.description}</p>
                      <p><label>View Count:</label> {bento.visit_count} </p>
                      {/*<p><a href='#View' className='btn btn-primary' role='button'>View</a> <a href='#' className='btn btn-default' role='button'>Edit</a></p>*/}
                      <p><Link className='btn btn-primary' to={'/display/' + bento.id}>View</Link><span>   </span><Link className='btn btn-default' to={'/edit/' + bento.id}>Edit</Link></p>
                    </div>
                  </div>
                )) : (<h1 className='center-block'>Sorry, no results were found!</h1>)
              }
              
            </div>
          </div>


        </div>
      </div>
    )
  }
}

export default Search;