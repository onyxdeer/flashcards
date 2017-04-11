import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bentosToDisplay: [],
    }

    this.fetchBentos = this.fetchBentos.bind(this);
  }

  fetchBentos() {
    var context = this;
    var bentoData = [];
    var idArray = [];
    var imgArray = [];
    axios.get('/api/bentos', {
      params: { name: this.props.query }
    })
    .then(function(response) {
      for (var i = 0; i < response.data.length; i++ ) {
        if (!response.data[i].private) {
          bentoData.push(response.data[i]);
          idArray.push(response.data[i].id);
        }
      }
    });
    axios.get('/api/thumbnails', {
      params: { bento_id: idArray }
    }).then(function(response) {
      var imgData = response.data;
      // populate the ones with images
      for (var i = 0; i < bentoData.length; i++) {
        for (var j = 0; j < imgData.length; j++) {
          if (imgData[j].bento_id === bentoData[i].id) {
            bentoData[i].img_url = imgData[j].url;
          }
        }
      }
      context.setState({
        bentosToDisplay: bentoData
      });
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
              <button type='button' className='btn btn-success filterButtons'>Name</button>
              <button type='button' className='btn btn-success filterButtons'>Views</button>
              <button type='button' className='btn btn-success filterButtons'>Rating</button>
              <button type='button' className='btn btn-success filterButtons'>Date Created</button>
              <button type='button' className='btn btn-success filterButtons'>Recently Updated</button>
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
                      <p><Link className='btn btn-primary' to={'/display/' + bento.id}>View</Link><span>   </span><Link className='btn btn-default' to={'/edit'} onClick={() => this.props.setBentoId(bento.id)}>Edit</Link></p>
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