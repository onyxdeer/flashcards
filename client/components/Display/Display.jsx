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
        bento: [{
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
      currentNori: 0,
      input: ''
    }

    this.prevNori = this.prevNori.bind(this);
    this.nextNori = this.nextNori.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.setNori = this.setNori.bind(this);
    this.shuffleNori = this.shuffleNori.bind(this);
  }

  nextNori() {
    if (this.state.currentNori < this.state.mockData.bento.length - 1) {
      this.setState({
        currentNori: this.state.currentNori+=1
      });
    }
    this.setState({
      noriToDisplay: this.state.mockData.bento[this.state.currentNori]
    });
  }

  prevNori() {
    if (this.state.currentNori > 0) {
      this.setState({
        currentNori: this.state.currentNori-=1
      });
    }
    this.setState({  
      noriToDisplay: this.state.mockData.bento[this.state.currentNori]
    });
  }

  handleInput(event) {
    this.setState({
      input: event.target.value
    });
  }

  setNori(event) {
    event.preventDefault(); 
    if (this.state.input >= 0 && this.state.input < this.state.mockData.bento.length) {
      this.setState({
        currentNori: this.state.input,
        noriToDisplay: this.state.mockData.bento[this.state.input]
      });
    } else {
      alert('Invalid nori number, please enter another number.');
    }
  }

  shuffleNori() {
    var temp = this.state.mockData.bento.slice();
    var result = [];
    var randomIndex;
    while (temp.length > 0) {
      randomIndex = Math.floor(Math.random() * temp.length);
      result.push(temp[randomIndex]);
      temp.splice(randomIndex, 1);
    }
    console.log('shuffleNori:', result);
    this.setState({
      mockData: { 
        title: this.state.mockData.title,
        description: this.state.mockData.description,
        tags: this.state.mockData.tags,
        bento: result
      },
      currentNori: 0,
      noriToDisplay: this.state.mockData.bento[0]
    });
  }

  componentWillMount() {
    // send an DB GET request for the flash cards here
  }

  componentDidUpdate() {
    
  }

  render() {
    console.log('this.state.mockData in render:', this.state.mockData.bento);
    console.log('this.state.noriToDisplay in render:', this.state.noriToDisplay);
    return (
      <div>
        <h1>Bento: {this.state.mockData.title}</h1>
          <FlipCard>
            <div>{this.state.noriToDisplay ? this.state.noriToDisplay.front : this.state.mockData.bento[0].front}</div>
            <div>{this.state.noriToDisplay ? this.state.noriToDisplay.back : this.state.mockData.bento[0].back}</div>
          </FlipCard>
          <div className='buttonSection'>
            <button className='btn btn-default' onClick={this.prevNori}>Previous Nori</button>
            <button className='btn btn-default' onClick={this.nextNori}>Next Nori</button>
            <button className='btn btn-default' onClick={this.shuffleNori}>Shuffle Bento</button>
          </div>
          <form className='changeToNoriSection' onSubmit={this.setNori}>
            <label>Enter from 0 to {this.state.mockData.bento.length - 1} to go to that Nori: </label>
            <input type='text' value={this.state.input} onChange={this.handleInput} placeholder='Enter a number here!' />
          </form>
      </div>
    )
  }
}

export default Display;