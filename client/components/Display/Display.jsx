import React, { Component } from 'react';
import Deck from 'react-deck';
import Card from 'react-card';
import classnames from 'classnames';
import axios from 'axios';
import Swipeable from 'react-swipeable';
import RichTextEditor from 'react-rte';
import {convertFromRaw, convertToRaw, ContentState, Editor, EditorState} from 'draft-js';

class Display extends Component {
  constructor(props) {
    super(props);

    const content = ContentState.createFromText('Hello World!');

    this.state = {
      title: '',
      bentoData: [],
      imgData: [],
      noriToDisplay: null,
      currentNori: 0,
      isFlipped: false,
      buttonPressed: false,
      input: '',
      editorState: EditorState.createWithContent(content),
      editorStates: []
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

  // Get all bento image entries for given bento_id
  fetchImages() {
    var context = this;
    axios.get('/api/images', {
      params: { bento_id: this.props.bentoId }
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

    // Get bento title for given bento_id
    axios.get('/api/bentos', {
      params: { id: this.props.bentoId }
    }).then(function(response) {
      console.log('GETTING TITLE:', response.data[0].name);
      context.setState({
        title: response.data[0].name
      });
    });

    // Get all the nori_ids for given bento_id
    // Get all the nori entries for given bento_id
    axios.get('/api/bentos_noris',{
        params: { bento_id: this.props.bentoId }
      }).then(function(response) {
      console.log('/api/bentos_noris response:', response.data);
      for (var index = 0; index < response.data.length; index++) {
        idArray.push(response.data[index].nori_id);
      }
      if (idArray.length === 0) {
        context.setState({
          bentoData: [{
            text_front: 'Sorry, no cards available!',
            text_back: 'Try another bento!'
          }]
        });
      } else {
        axios.get('/api/noris', {
          params: { id: idArray }
        }).then(function(response) {
          console.log('/api/noris response:', response.data);
          context.setState({
            bentoData: response.data
          },() => console.log('bentoData set to:', context.state.bentoData));
        });
      }
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
              {/*<div className='row'>{nori.text_front}</div>*/}
              <div className='row'>
                {console.log('what is text_front parsed:', JSON.parse(nori.text_front))}
                <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(nori.text_front)))} readOnly={true} />
              </div>
            </div>
          </div>
        </Card.Front>
        <Card.Back>
          {/*<p className={className} onClick={this.flipToFront}>{nori.text_back}</p>*/}
          <div className='row'>
            <div className={className} onClick={this.flipToFront}>
              <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(nori.text_back)))} readOnly={true} />
            </div>
          </div>
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

  onChange(editorState) {
    this.setState({
      editorState
    })
  }

  componentWillMount() {
    // send an DB GET request for the flash cards here
    this.fetchImages();
    this.fetchBento();
  }

  render() {

    console.log('rendering Display:', this.state.bentoData);
    console.log('this.state.editorState:', this.state.editorState);

    return (
      <div>
        <div className='row'>
          <h1 className='create-title'>Bento: {this.state.title}</h1>
        </div>
        <div className='row'>
            {this.state.bentoData.length > 0 ? <Swipeable
              onSwipedUp={this.prevNori}
              onSwipedDown={this.nextNori}
              onSwipedLeft={this.prevNori}
              onSwipedRight={this.nextNori}>
                <div className='cardSection'>
                  <Deck>
                    {this.getSortedNoris().map(this.renderNori, this)}
                  </Deck>
                </div> 
            </Swipeable> : <h1 className='center-block'>Sorry, no cards available!</h1> }
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