import React, { Component, PropTypes } from 'react';
import Deck from 'react-deck';
import classnames from 'classnames';
import axios from 'axios';
import Swipeable from 'react-swipeable';
import RichTextEditor from 'react-rte';
import {convertFromRaw, convertToRaw, ContentState, Editor, EditorState} from 'draft-js';
import displayActions from '../../actions/displayActions.js';
import { connect } from 'react-redux';

class Display extends Component {
  constructor(props) {
    super(props);

    if (this.props.shortenerId) {
      console.log('SHORTEN ID DETECTED:', this.props.shortenerId);
    }

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getSortedNoris = this.getSortedNoris.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.renderNori = this.renderNori.bind(this);
    this.handleSetNori = this.handleSetNori.bind(this);

    this.props.fetchBentoMetaData(this.props.shortenerId ? this.props.shortenerId : this.props.bentoId);
    this.props.fetchFrontImages(this.props.shortenerId ? this.props.shortenerId : this.props.bentoId);
    this.props.fetchBackImages(this.props.shortenerId ? this.props.shortenerId : this.props.bentoId);
    this.props.fetchNoris(this.props.shortenerId ? this.props.shortenerId : this.props.bentoId);
  }

  getSortedNoris () {
    let stackSize = this.props.bentoData.length >= 10 ? 10 : this.props.bentoData.length;
    return this.props.bentoData
      .slice(this.props.currentNori)
      .concat(this.props.bentoData.slice(0, this.props.currentNori))
      .slice(0, stackSize) // for performance
      .reverse();
  }

  renderImages(nori, front) {
    let noriImages;
    if (front) {
      noriImages = this.props.imgDataFront.filter(function(image) {
        return image.nori_id === nori.id;
      });
    } else {
      noriImages = this.props.imgDataBack.filter(function(image) {
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
      'card-flipped': index === noris.length - 1 && this.props.isFlipped && !this.props.buttonPressed,
      'no-animation': this.props.buttonPressed
    });
    return (
      <Deck.Card key={nori.text_front} className={className}>
        <Deck.Card.Front>
            <div className={className} onClick={this.props.flipToBack}>
              <div className='row'>{this.renderImages(nori, true)}</div>
              <div className='row'>
                <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(nori.text_front)))} readOnly={true} />
              </div>
            </div>
        </Deck.Card.Front>
        <Deck.Card.Back>
          <div className={className} onClick={this.props.flipToFront}>
            <div className='row'>{this.renderImages(nori, false)}</div>
            <div className='row'>
              <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(nori.text_back)))} readOnly={true} />
            </div>
          </div>
        </Deck.Card.Back>
      </Deck.Card>
    );
  }

  handleSetNori(event) {
    event.preventDefault();
    return this.props.setNori(this.props.input, this.props.bentoData);
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
        case 37:
            console.log('left');
            this.props.prevNori(this.props.bentoData, this.props.currentNori);
            break;
        case 38:
            console.log('up');
            this.props.flipToBack();
            break;
        case 39:
            console.log('right');
            this.props.nextNori(this.props.bentoData, this.props.currentNori)
            break;
        case 40:
            console.log('down');
            this.props.flipToFront();
            break;
    }
  }

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {

    console.log('bentoData in render:', this.props.bentoData);
    return (
      <div>
        <div className='row'>
          <h1 className='default-font create-title'>Bento: {this.props.title}</h1>
        </div>
        <div className='row'>
            {this.props.bentoData&&(this.props.bentoData.length > 0) ? <Swipeable
              onSwipedUp={() => this.props.prevNori(this.props.bentoData, this.props.currentNori)}
              onSwipedDown={() => this.props.nextNori(this.props.bentoData, this.props.currentNori)}
              onSwipedLeft={() => this.props.prevNori(this.props.bentoData, this.props.currentNori)}
              onSwipedRight={() => this.props.nextNori(this.props.bentoData, this.props.currentNori)}>
                <div className='cardSection'>
                  <Deck>
                    {this.getSortedNoris().map(this.renderNori, this)}
                  </Deck>
                </div> 
            </Swipeable> : <h1 className='center-block'>Sorry, no cards available!</h1> }
        </div>
          <div className='buttonSection'>
            <button type='button' className='btn btn-success' onClick={() => this.props.prevNori(this.props.bentoData, this.props.currentNori)}>Previous Nori</button>
            <button type='button' className='btn btn-success' onClick={() => this.props.nextNori(this.props.bentoData, this.props.currentNori)}>Next Nori</button>
            <button type='button' className='btn btn-success' onClick={() => this.props.shuffleNori(this.props.bentoData)}>Shuffle Bento</button>
          </div>
          <form className='changeToNoriSection' onSubmit={this.handleSetNori}>
            <div className='row'>
              <text>Currently at card {this.props.currentNori}.</text>
            </div>
            <div className='row'>
              <label>Enter from 0 to {this.props.bentoData ? this.props.bentoData.length - 1 : 0} to go to that Nori: </label>
                <span>  </span>
              <input type='text' className='cardNumberField' value={this.props.input} onChange={(event) => this.props.handleInput(event)} placeholder='Enter a number here!' />
            </div>
            <div className='row'>
              <label>Share this bento with the following link!</label><span>  </span><input type='text' className='shortenURLField' value={`localhost:8000/id=${this.props.id_hash}`} />
            </div>
          </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    shortenerId: state.appReducer.shortenerId,
    bentoData: state.displayReducer.bentoData,
    imgDataFront: state.displayReducer.imgDataFront,
    imgDataBack: state.displayReducer.imgDataBack,
    noriToDisplay: state.displayReducer.noriToDisplay,
    currentNori: state.displayReducer.currentNori,
    isFlipped: state.displayReducer.isFlipped,
    buttonPressed: state.displayReducer.buttonPressed,
    input: state.displayReducer.input,
    title: state.displayReducer.title,
    id_hash: state.displayReducer.id_hash
  }
}

export default connect(mapStateToProps, displayActions)(Display);
