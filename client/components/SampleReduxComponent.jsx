import React, { Component, PropTypes } from 'react';
// connect is what we use to bind the component to redux store
import { connect } from 'react-redux';

import * as actions from './actions/sampleActions.js';

class SampleReduxComponent extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
          {this.props.componentPropData}
      </div>
    );
  }
}





//we map the state to props where the keys are the props on this component and the values are the corresponding state tree from the store
function mapStateToProps(state) {
  return { 
    //these are just sample names
    // userData: state.recipes.userRecipes,
    // viewFollows: state.follows.dataForUser,
    // favorites: state.favorites.dataForUser,
    // data: state.recipes.data
    componentPropData: state.data
  }
}

export default connect(mapStateToProps, actions)(SampleReduxComponent);

// export default SampleReduxComponent;


