import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { endNavSubmit, setBentoId } from '../../actions/appActions.js';
import { searchBentos } from '../../actions/searchActions.js';
import personalActions from '../../actions/personalActions.js';
import SearchItem from './SearchItem/SearchItem.jsx';
import Modal from '../Voice/Modal.jsx'

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

  componentDidMount() {

  }

  render() {

    console.log('bentosToDisplay in render:', this.props.bentos);

    return (
      <div className='container-fluid'>
        <Modal/>
        {/* Header */}
        <div className='searchSection'>
          <h1>Search Results for: {this.props.query !== '' ? this.props.query : 'Everything!'}</h1>

          {/* Filter bar */}
          {/*<div className='filterSection'>
            Filter By: <span>
              <button type='button' className='btn btn-success filterButtons'>Name</button>
              <button type='button' className='btn btn-success filterButtons'>Views</button>
              <button type='button' className='btn btn-success filterButtons'>Rating</button>
              <button type='button' className='btn btn-success filterButtons'>Date Created</button>
              <button type='button' className='btn btn-success filterButtons'>Recently Updated</button>
            </span>
          </div>*/}

          <div>
          {/*Search results*/}
            {
              this.props.bentos&&(this.props.bentos.length > 0 )? this.props.bentos.map((bento, index) => (
                <SearchItem item={bento} userId={userId} key={index}/>
              )) : (<h1>Sorry, no results were found!</h1>)
            }

          </div>

        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    bentos: state.searchReducer.bentos,
    query: state.appReducer.query,
  }
}

export default connect(mapStateToProps, { ...personalActions, searchBentos, endNavSubmit, setBentoId })(Search);