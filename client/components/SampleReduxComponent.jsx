import React, { Component, PropTypes } from 'react';

class SampleReduxComponent extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
          {this.props.hello}
      </div>
    );
  }
}


export default SampleReduxComponent;


