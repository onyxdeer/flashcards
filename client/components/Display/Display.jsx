import React, { Component } from 'react';
import FlipCard from 'react-flipcard';
// import Cards, { Card } from 'react-swipe-card';

class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mockData: {
        title: 'Mock Data Title Here',
        description: 'This is mock data',
        tags: null,
        obento: [{
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
      },
      noriToDisplay: null,
      currentNori: 0
    }

    this.prevNori = this.prevNori.bind(this);
    this.nextNori = this.nextNori.bind(this);
  }

  nextNori() {
    if (this.state.currentNori < this.state.mockData.obento.length - 1) {
      this.setState({
        currentNori: this.state.currentNori+=1
      });
    }
    this.setState({
      noriToDisplay: this.state.mockData.obento[this.state.currentNori]
    });
  }

  prevNori() {
    if (this.state.currentNori > 0) {
      this.setState({
        currentNori: this.state.currentNori-=1
      });
    }
    this.setState({  
      noriToDisplay: this.state.mockData.obento[this.state.currentNori]
    });
  }

  render() {
    return (
      <div>
        <h1>Obento: {this.state.mockData.title}</h1>
          <FlipCard>
            <div>{this.state.noriToDisplay ? this.state.noriToDisplay.front : this.state.mockData.obento[0].front}</div>
            <div>{this.state.noriToDisplay ? this.state.noriToDisplay.back : this.state.mockData.obento[0].back}</div>
          </FlipCard>
          <div className='buttonSection'>
            <button className='btn btn-default' onClick={this.prevNori}>Previous Nori</button>
            <button className='btn btn-default' onClick={this.nextNori}>Next Nori</button>
          </div>
      </div>
    )
  }
}

export default Display;