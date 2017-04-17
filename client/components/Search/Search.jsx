import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// connect is what we use to bind the component to redux store
import { connect } from 'react-redux';

import { endNavSubmit, setBentoId } from '../../actions/appActions.js';
import { searchBentos } from '../../actions/searchActions.js';
import personalActions from '../../actions/personalActions.js';

let userId = 1;

class Search extends Component {
  constructor(props) {
    super(props);

    if (this.props.userId !== 'guest') {
      userId = this.props.userId;
    }

    this.props.searchBentos(this.props.query);
  }

  componentWillMount() {
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
                      <p><Link className='btn btn-primary' to={'/display/' + bento.id} onClick={() => this.props.setBentoId(bento.id)}>View</Link><span>   </span><Link className='btn btn-default' to={'/edit'} onClick={() => this.props.handleFetchBentoForEdit(this.props.bento, bento.id, userId)}>Edit</Link></p>
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
    bento: state.editBentoInfo,
    bentos: state.searchReducer,
    query: state.appReducer.query,
  }
}

export default connect(mapStateToProps, { ...personalActions, searchBentos, endNavSubmit, setBentoId })(Search);