import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// connect is what we use to bind the component to redux store
import { connect } from 'react-redux';

import { searchBentos } from '../../actions/searchActions.jsx';
import { endNavSubmit } from '../../actions/appActions.jsx';

class Search extends Component {
  constructor(props) {
    super(props);
    this.props.searchBentos(this.props.query);
    this.props.endNavSubmit();
  }

  render() {

    console.log('bentosToDisplay in render:', this.props.bentos);

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
                this.props.bentos&&(this.props.bentos.length > 0 )? this.props.bentos.map((bento, index) => (
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

function mapStateToProps(state) {
  return { 
    bentos: state.searchReducer
  }
}

export default connect(mapStateToProps, {searchBentos, endNavSubmit})(Search);