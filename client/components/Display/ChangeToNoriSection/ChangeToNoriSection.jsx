import React, { Component } from 'react';
import displayActions from '../../../actions/displayActions.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ChangeToNoriSection extends Component {
  constructor(props) {
    super(props);

    this.handleSetNori = this.handleSetNori.bind(this);
  }
  
  handleSetNori(event) {
    event.preventDefault();
    this.props.setNori(this.props.input, this.props.bentoData);
  }

  render() {
    return (
      <form className='changeToNoriSection' onSubmit={this.handleSetNori}>
        <div className='row'>
          <text>Currently at card {this.props.currentNori+1}.</text>
        </div>
        <div className='row'>
          <label>Enter from 1 to {this.props.bentoData ? this.props.bentoData.length : 1} to go to that Nori: </label>
            <span>  </span>
          <input type='tel' className='cardNumberField' value={this.props.input} onChange={(event) => this.props.handleInput(event)} placeholder='Enter a number here!' />
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    bentoData: state.displayReducer.bentoData,
    currentNori: state.displayReducer.currentNori,
    input: state.displayReducer.input,
  }
}

export default connect(mapStateToProps, { ...displayActions })(ChangeToNoriSection);
