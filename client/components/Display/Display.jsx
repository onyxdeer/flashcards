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
      title: '',
      bentoData: [],
      imgData: [],
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
    this.flipToBack = this.flipToBack.bind(this);
    this.flipToFront = this.flipToFront.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.setNori = this.setNori.bind(this);
    this.shuffleNori = this.shuffleNori.bind(this);
    this.fetchBento = this.fetchBento.bind(this);
    this.fetchImages = this.fetchImages.bind(this);
    this.renderImages = this.renderImages.bind(this);
  }

  fetchImages() {
    var context = this;

    axios.get('/api/images', {
      params: { bento_id: this.props.match.params.id }
    }).then(function(response) {
      console.log('response from fetchImages:', response.data);
      context.setState({
        imgData: response.data
      }, () => console.log('imgData set to:', context.state.imgData));
    })
  }

  fetchBento() {
    var context = this;
    var idArray = [];

    // Get title of the bento
    axios.get('/api/bento', {
      params: { id: this.props.match.params.id }
    }).then(function(response) {
      context.setState({
        title: response.data[0].name
      });
    });

    // Get the noris
    axios.get('/api/bentos_noris',{
        params: { bento_id: this.props.match.params.id }
      }).then(function(response) {
      console.log('/api/bentos_noris response:', response.data);
      for (var index = 0; index < response.data.length; index++) {
        idArray.push(response.data[index].nori_id);
      }
      axios.get('/api/noris', {
        params: { id: idArray }
      }).then(function(response) {
        console.log('/api/noris response:', response.data);
        context.setState({
          bentoData: response.data
        },() => console.log('bentoData set to:', context.state.bentoData));
      });
    });
  }

  getSortedNoris () {
    let stackSize = this.state.bentoData.length >= 10 ? 10 : this.state.bentoData.length;
    return this.state.bentoData
      .slice(this.state.currentNori)
      .concat(this.state.bentoData.slice(0, this.state.currentNori))
      .slice(0, stackSize) // for performance
      .reverse();
  }

  renderImages(nori) {
    let noriImages = this.state.imgData.filter(function(image) {
      return image.nori_id === nori.id;
    });
    if (noriImages.length > 0) {
      return noriImages.map((image) => (<img className='noriImage' key={nori.id} src={image.url}></img>));
    } else {
      return '';
    }
  }

  renderNori (nori, index , noris) {
    const className = classnames('index-card', {
      'card-flipped': index === noris.length - 1 && this.state.isFlipped && !this.state.buttonPressed,
      'no-animation': this.state.buttonPressed
    });
    console.log('className in render:', className);
    console.log('nori: ', nori, 'index: ', index, 'noris: ', noris)
    return (
      <Card key={nori.text_front} className={className}>
        <Card.Front>
          <div className='row'>
            <div className={className} onClick={this.flipToBack}>
              <div className='row'>{this.renderImages(nori)}</div>
              <div className='row'>{nori.text_front}</div>
            </div>
          </div>
        </Card.Front>
        <Card.Back>
          <p className={className} onClick={this.flipToFront}>{nori.text_back}</p>
        </Card.Back>
      </Card>
    );
  }

  nextNori() {
    this.flipToFront();
    if (this.state.currentNori < this.state.bentoData.length - 1) {
      this.setState({
        currentNori: this.state.currentNori+=1
      });
    }
    this.setState({
      noriToDisplay: this.state.bentoData[this.state.currentNori],
      buttonPressed: true
    });
  }

  prevNori() {
    this.flipToFront();
    if (this.state.currentNori > 0) {
      this.setState({
        currentNori: this.state.currentNori-=1
      });
    }
    this.setState({  
      noriToDisplay: this.state.bentoData[this.state.currentNori],
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
      // buttonPressed: false
    });
  }

  flipToFront() {
    console.log('Toggling isFlippedToFront');
    this.setState({
      isFlipped: false,
      buttonPressed: false
    });
  }

  flipToBack() {
    console.log('Toggling isFlippedToBack');
    this.setState({
      isFlipped: true,
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
    if (this.state.input >= 0 && this.state.input < this.state.bentoData.length) {
      this.setState({
        currentNori: this.state.input,
        noriToDisplay: this.state.bentoData[this.state.input]
      });
    } else {
      alert('Invalid nori number, please enter another number.');
    }
  }

  shuffleNori() {
    var context = this;
    var temp = this.state.bentoData.slice();
    var result = [];
    var randomIndex;
    while (temp.length > 0) {
      randomIndex = Math.floor(Math.random() * temp.length);
      result.push(temp[randomIndex]);
      temp.splice(randomIndex, 1);
    }
    console.log('shuffleNori:', result);
    this.flipToFront();
    this.setState({
      bentoData: result,
      currentNori: 0,
      buttonPressed: true
    }, () => context.setState({ noriToDisplay: context.state.bentoData[0] }));
  }

  componentWillMount() {
    // send an DB GET request for the flash cards here
    this.fetchImages();
    this.fetchBento();
  }

  componentDidUpdate() {
    
  }

  render() {

    console.log('rendering Display');

    return (
      <div>
        <div className='row'>
          <h1 className='create-title'>Bento: {this.state.bentoData.title}</h1>
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
              <label>Enter from 0 to {this.state.bentoData.length - 1} to go to that Nori: </label>
              <input type='text' value={this.state.input} onChange={this.handleInput} placeholder='Enter a number here!' />
            </div>
          </form>
      </div>
    )
  }
}

export default Display;

// {
//         title: 'Mock Data Title Here',
//         description: 'This is mock data',
//         thumbnail: null,
//         tags: null,
//         bento: [{
//           front: 'Front 1',
//           back: 'Lorem ipsum dolor sit amet, sit eu probo commodo elaboraret, affert persecuti his cu.\nPutant meliore ad qui, nonumy ignota pri et. Eum cibo eligendi evertitur in. Cum no esse\npartem forensibus, est quas quidam mnesarchum an. Sed ne omnium copiosae delectus, eu nec\neligendi placerat vituperatoribus. Mel alterum contentiones id. Eos ferri ceteros ne, impedit\nnostrum at eum, libris ocurreret laboramus id eum. Has dictas insolens et, vel malis dicant\nquaestio an, ne ferri adipisci ius. Sale soluta conceptam an vel, per ex quis putent consequuntur.\nEquidem iudicabit adolescens in nec, exerci tamquam fabulas vis an, ius dolores antiopam percipitur\nno. Nemore sententiae neglegentur ea mei. Iisque integre mentitum sed ad. An aeterno phaedrum nam,\ntritani verterem dignissim per et. Error officiis vis ei. Ad eos consul ceteros elaboraret, veniam\nprodesset duo ad.'
//         }, {
//           front: 'Front 2',
//           back: 'Back 2'
//         }, {
//           front: 'Front 3',
//           back: 'Back 3'
//         }]
//       }