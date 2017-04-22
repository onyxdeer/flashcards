import React, { Component } from 'react';
import Deck from 'react-deck';
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
      imgDataFront: [],
      imgDataBack: [],
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
    this.flipToBack = this.flipToBack.bind(this);
    this.flipToFront = this.flipToFront.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.setNori = this.setNori.bind(this);
    this.shuffleNori = this.shuffleNori.bind(this);
    this.fetchBento = this.fetchBento.bind(this);
    this.fetchFrontImages = this.fetchFrontImages.bind(this);
    this.fetchBackImages = this.fetchBackImages.bind(this);
    this.renderImages = this.renderImages.bind(this);
  }

  fetchFrontImages() {
    var context = this;
    axios.get('/api/images', {
      params: { 
        bento_id: this.props.bentoId,
        nori_front: true
       }
    }).then(function(response) {
      console.log('response from fetchFrontImages:', response.data);
      context.setState({
        imgDataFront: response.data
      }, () => console.log('imgData set to:', context.state.imgDataFront));
    })
  }

  fetchBackImages() {
    var context = this;
    axios.get('/api/images', {
      params: { 
        bento_id: this.props.bentoId,
        nori_back: true
       }
    }).then(function(response) {
      console.log('response from fetchBackImages:', response.data);
      context.setState({
        imgDataBack: response.data
      }, () => console.log('imgData set to:', context.state.imgDataBack));
    })
  }

  fetchBento() {
    var context = this;
    var idArray = [];

    // Get bento title for given bento_id
    axios.get('/api/bentos', {
      params: { id: this.props.bentoId }
    }).then(function(response) {
      context.setState({
        title: response.data[0].name
      });
    });

    // Get all the nori_ids for given bento_id
    // Get all the nori entries for given bento_id
    axios.get('/api/bentosNoris',{
        params: { bento_id: this.props.bentoId }
      }).then(function(response) {
      console.log('/api/bentosNoris response:', response.data);
      for (var index = 0; index < response.data.length; index++) {
        idArray.push(response.data[index].nori_id);
      }
      // for (var i = 0; i < that.state.imgData.length; i++) {
      //    if (imgData[i].nori_front === true) {
      //      response.data[index][imagesFront].push(imgData(i));
      //    } else (imgData[i].nori_back === true)
      //      response.data[index][imagesBack].push(imgData(i));
      //    }
      //  }
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

  renderImages(nori, front) {
    let noriImages;
    if (front) {
      noriImages = this.state.imgDataFront.filter(function(image) {
        return image.nori_id === nori.id;
      });
    } else {
      noriImages = this.state.imgDataBack.filter(function(image) {
        return image.nori_id === nori.id;
      });
    }
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
    return (
      <Deck.Card key={nori.text_front} className={className}>
        <Deck.Card.Front>
            <div className={className} onClick={this.flipToBack}>
              <div className='row'>{this.renderImages(nori, true)}</div>
              <div className='row'>
                <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(nori.text_front)))} readOnly={true} />
              </div>
            </div>
        </Deck.Card.Front>
        <Deck.Card.Back>
          <div className={className} onClick={this.flipToFront}>
            <div className='row'>{this.renderImages(nori, false)}</div>
            <div className='row'>
              <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(nori.text_back)))} readOnly={true} />
            </div>
          </div>
        </Deck.Card.Back>
      </Deck.Card>
    );
  }

  nextNori() {
    if (this.state.currentNori < this.state.bentoData.length - 1) {
      this.setState({
        currentNori: this.state.currentNori+=1
      });
      this.flipToFront();
      // set buttonPressed back to true from this.flipToFront
      this.setState({
        buttonPressed: true
      });
      this.setState({
        noriToDisplay: this.state.bentoData[this.state.currentNori]
      });
    }
  }

  prevNori() {
    if (this.state.currentNori > 0) {
      this.setState({
        currentNori: this.state.currentNori-=1
      });
      this.flipToFront();
      // set buttonPressed back to true from this.flipToFront
      this.setState({
        buttonPressed: true
      });
      this.setState({  
        noriToDisplay: this.state.bentoData[this.state.currentNori]
      });
    }
  }

  showBack() {
    this.setState({
      isFlipped: true
    });
  }

  showFront() {
    this.setState({
      isFlipped: false
    });
  }

  flipToFront() {
    this.setState({
      isFlipped: false,
      buttonPressed: false
    });
  }

  flipToBack() {
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
    this.flipToFront();
    this.setState({
      bentoData: result,
      currentNori: 0,
      buttonPressed: true
    }, () => context.setState({ noriToDisplay: context.state.bentoData[0] }));
  }

  componentWillMount() {
    // send an DB GET request for the flash cards here
    this.fetchFrontImages();
    this.fetchBackImages();
    this.fetchBento();
  }

  render() {

    return (
      <div>
        <div className='row'>
          <h1 className='default-font create-title'>Bento: {this.state.title}</h1>
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
            {/*<a tabIndex="0" className='btn btn-success popover-dismiss' role="button" data-toggle="popover" data-trigger="focus" title="Shuffling..." data-content="Bento has been shuffled.">Shuffle Bentos</a>*/}
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