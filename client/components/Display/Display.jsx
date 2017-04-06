import React, { Component } from 'react';
import Deck from 'react-deck';
import Card from 'react-card';
import classnames from 'classnames';
import axios from 'axios';
import Swipeable from 'react-swipeable';

class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mockData: {
        title: 'Mock Data Title Here',
        description: 'This is mock data',
        thumbnail: null,
        tags: null,
        bento: [{
          front: 'Front 1',
          back: 'Lorem ipsum dolor sit amet, sit eu probo commodo elaboraret, affert persecuti his cu.\nPutant meliore ad qui, nonumy ignota pri et. Eum cibo eligendi evertitur in. Cum no esse\npartem forensibus, est quas quidam mnesarchum an. Sed ne omnium copiosae delectus, eu nec\neligendi placerat vituperatoribus. Mel alterum contentiones id. Eos ferri ceteros ne, impedit\nnostrum at eum, libris ocurreret laboramus id eum. Has dictas insolens et, vel malis dicant\nquaestio an, ne ferri adipisci ius. Sale soluta conceptam an vel, per ex quis putent consequuntur.\nEquidem iudicabit adolescens in nec, exerci tamquam fabulas vis an, ius dolores antiopam percipitur\nno. Nemore sententiae neglegentur ea mei. Iisque integre mentitum sed ad. An aeterno phaedrum nam,\ntritani verterem dignissim per et. Error officiis vis ei. Ad eos consul ceteros elaboraret, veniam\nprodesset duo ad.'
        }, {
          front: 'Front 2',
          back: 'Back 2'
        }, {
          front: 'Front 3',
          back: 'Back 3'
        }]
      },
      noriToDisplay: null,
      currentNori: 0,
      isFlipped: false,
      buttonPressed: false,
      input: ''
    }

    this.prevNori = this.prevNori.bind(this);
    this.nextNori = this.nextNori.bind(this);
    this.showBack = this.showBack.bind(this);
    this.showFront = this.showFront.bind(this);
    this.flip = this.flip.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.setNori = this.setNori.bind(this);
    this.shuffleNori = this.shuffleNori.bind(this);
    this.fetchBentos = this.fetchBentos.bind(this);

    // this.fetchBentos();
  }

  fetchBentos() {
    axios.get('/get/bentos', function(response) {
      console.log(response);
    }).catch(function(err) {
      console.error(err);
    });
  }

  getSortedNoris () {
    let stackSize = this.state.mockData.bento.length >= 10 ? 10 : this.state.mockData.bento.length;
    return this.state.mockData.bento
      .slice(this.state.currentNori)
      .concat(this.state.mockData.bento.slice(0, this.state.currentNori))
      .slice(0, stackSize) // for performance
      .reverse();
  }

  renderNori (nori, index , noris) {
    const className = classnames('index-card', {
      'card-flipped': index === noris.length - 1 && this.state.isFlipped && !this.state.buttonPressed,
      'no-animation': this.state.buttonPressed
    });
    console.log('className in render:', className);
    console.log('nori: ', nori, 'index: ', index, 'noris: ', noris)
    return (
      <Card key={nori.front} className={className}>
        <Card.Front>
          <p className={className} onClick={this.flip}>{nori.front}</p>
        </Card.Front>
        <Card.Back>
          <p className={className} onClick={this.flip}>{nori.back}</p>
        </Card.Back>
      </Card>
    );
  }

  nextNori() {
    if (this.state.isFlipped) {
      this.flip();
    }
    if (this.state.currentNori < this.state.mockData.bento.length - 1) {
      this.setState({
        currentNori: this.state.currentNori+=1
      });
    }
    this.setState({
      noriToDisplay: this.state.mockData.bento[this.state.currentNori],
      buttonPressed: true
    });
  }

  prevNori() {
    if (this.state.isFlipped) {
      this.flip();
    }
    if (this.state.currentNori > 0) {
      this.setState({
        currentNori: this.state.currentNori-=1
      });
    }
    this.setState({  
      noriToDisplay: this.state.mockData.bento[this.state.currentNori],
      buttonPressed: true
    });
  }

  showBack() {
    console.log('Calling showBack');
    this.setState({
      isFlipped: true
    });
  }

  showFront() {
    console.log('Calling showFront');
    this.setState({
      isFlipped: false
    });
  }

  flip() {
    console.log('Toggling isFlipped to:', this.state.isFlipped);
    this.setState({
      isFlipped: !this.state.isFlipped,
      buttonPressed: false
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
    var context = this;
    var temp = this.state.mockData.bento.slice();
    var result = [];
    var randomIndex;
    while (temp.length > 0) {
      randomIndex = Math.floor(Math.random() * temp.length);
      result.push(temp[randomIndex]);
      temp.splice(randomIndex, 1);
    }
    console.log('shuffleNori:', result);
    if (this.state.isFlipped) {
      this.flip();
    }
    this.setState({
      mockData: {
        title: this.state.mockData.title,
        description: this.state.mockData.description,
        tags: this.state.mockData.tags,
        bento: result
      },
      currentNori: 0,
      buttonPressed: true
    }, () => context.setState({ noriToDisplay: context.state.mockData.bento[0] }));
  }

  componentWillMount() {
    // send an DB GET request for the flash cards here
  }

  componentDidUpdate() {
    
  }

  render() {

    return (
      <div>
        <div className='row'>
          <h1 className='create-title'>Bento: {this.state.mockData.title}</h1>
        </div>
        <div className='row'>
            <Swipeable
              onSwipedUp={this.prevNori}
              onSwipedDown={this.nextNori}
              onSwipedLeft={this.prevNori}
              onSwipedRight={this.nextNori}>
                <div className='cardSection'>
                  <Deck>
                    {this.getSortedNoris().map(this.renderNori, this)}
                  </Deck>
                </div> 
            </Swipeable>
        </div>
          <div className='buttonSection'>
            <button type='button' className='btn btn-success' onClick={this.prevNori}>Previous Nori</button>
            <button type='button' className='btn btn-success' onClick={this.nextNori}>Next Nori</button>
            <button type='button' className='btn btn-success' onClick={this.shuffleNori}>Shuffle Bento</button>
          </div>
          <form className='changeToNoriSection' onSubmit={this.setNori}>
            <div className='row'>
              <text>Currently at card {this.state.currentNori}.</text>
            </div>
            <div className='row'>
              <label>Enter from 0 to {this.state.mockData.bento.length - 1} to go to that Nori: </label>
              <input type='text' value={this.state.input} onChange={this.handleInput} placeholder='Enter a number here!' />
            </div>
          </form>
      </div>
    )
  }
}

export default Display;