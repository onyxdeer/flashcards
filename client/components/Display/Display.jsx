import React, { Component } from 'react';
import Deck from 'react-deck';
import classnames from 'classnames';
import Swipeable from 'react-swipeable';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import displayActions from '../../actions/displayActions.js';
import * as appActions from '../../actions/appActions.js';
import { connect } from 'react-redux';

console.log('displayActions:', displayActions);
console.log('appActions:', appActions);

class Display extends Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getSortedNoris = this.getSortedNoris.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.renderNori = this.renderNori.bind(this);
    this.handleSetNori = this.handleSetNori.bind(this);
    this.handleVisitCountIncrement = this.handleVisitCountIncrement.bind(this);

    this.props.fetchBentoMetaData((this.props.shortenerId ? this.props.shortenerId : this.props.bentoId), this.handleVisitCountIncrement);
    this.props.fetchFrontImages(this.props.shortenerId ? this.props.shortenerId : this.props.bentoId);
    this.props.fetchBackImages(this.props.shortenerId ? this.props.shortenerId : this.props.bentoId);
    this.props.fetchNoris(this.props.shortenerId ? this.props.shortenerId : this.props.bentoId);
    this.props.resetCurrentNori();
  }

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidMount() {
    $("#alert-target").click(function () {
        toastr["info"]("SMS Sent!")
    });
    
    $('#smsForm').submit(function(e) {
      $('#sendSMS').modal('hide');
      toastr["info"]("SMS Sent!")
      return false;
    });

    this.props.clearShortenerId();
  }
  
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleVisitCountIncrement () {
    this.props.incrementVisitCount(this.props.bentoId, this.props.visit_count);
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
    front ? noriImages = this.props.imgDataFront.filter(function(image) { return image.nori_id === nori.id }) :
            noriImages = this.props.imgDataBack.filter(function(image) { return image.nori_id === nori.id });
    if (noriImages.length > 0) {
      return noriImages.map((image) => (<img className='noriImage' key={nori.id} src={image.url}></img>));
    }
    return '';
  }

  renderNori (nori, index , noris) {
    const className = classnames('index-card', {
      'card-flipped': index === noris.length - 1 && this.props.isFlipped && !this.props.buttonPressed,
      'no-animation': this.props.buttonPressed,
      // 'moveFromRight': index === noris.length - 1 && this.props.direction,
      // 'moveFromLeft': index === noris.length - 1 && !this.props.direction
    });
    return (
      <Deck.Card key={nori.text_front} className={className}>
        <Deck.Card.Front>
            <div className={className} onClick={this.props.flipToBack}>
              <div className='row imageSection'>{this.renderImages(nori, true)}</div>
              <div className='row frontText'>
                <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(nori.text_front)))} readOnly={true} />
              </div>
            </div>
        </Deck.Card.Front>
        <Deck.Card.Back>
          <div className={className} onClick={this.props.flipToFront}>
            <div className='row imageSection'>{this.renderImages(nori, false)}</div>
            <div className='row backText'>
              <Editor editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(nori.text_back)))} readOnly={true} />
            </div>
          </div>
        </Deck.Card.Back>
      </Deck.Card>
    );
  }

  handleSetNori(event) {
    console.log('CALLING HANDLESETNORI');
    event.preventDefault();
    this.props.setNori(this.props.input, this.props.bentoData);
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
        case 37:
            console.log('left');
            this.props.prevNori(this.props.bentoData, this.props.currentNori, this.props.direction);
            break;
        case 38:
            console.log('up');
            this.props.flipToBack();
            break;
        case 39:
            console.log('right');
            this.props.nextNori(this.props.bentoData, this.props.currentNori, this.props.direction)
            break;
        case 40:
            console.log('down');
            this.props.flipToFront();
            break;
    }
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
              onSwipedLeft={() => this.props.prevNori(this.props.bentoData, this.props.currentNori, this.props.direction)}
              onSwipedRight={() => this.props.nextNori(this.props.bentoData, this.props.currentNori, this.props.direction)}>
                <div className='cardSection'>
                  <Deck>
                    {this.getSortedNoris().map(this.renderNori, this)}
                  </Deck>
                </div>
            </Swipeable> : <h1 className='center-block'>Sorry, no cards available!</h1> }
        </div>
          <div className='buttonSection'>
            <button type='button' className='btn btn-success' onClick={() => this.props.prevNori(this.props.bentoData, this.props.currentNori, this.props.direction)}>Previous Nori</button>
            <button type='button' className='btn btn-success' onClick={() => this.props.nextNori(this.props.bentoData, this.props.currentNori, this.props.direction)}>Next Nori</button>
            <a href='#' className='btn btn-success' data-toggle='popover' data-placement='top' title="Shufflin'..." data-trigger='focus' data-content='Bento has been shuffled.' onClick={() => this.props.shuffleNori(this.props.bentoData, this.props.direction)}>Shuffle Bento</a>
          </div>
          <form className='changeToNoriSection' onSubmit={this.handleSetNori}>
            <div className='row'>
              <text>Currently at card {this.props.currentNori}.</text>
            </div>
            <div className='row'>
              <label>Enter from 0 to {this.props.bentoData ? this.props.bentoData.length - 1 : 0} to go to that Nori: </label>
                <span>  </span>
              <input type='tel' className='cardNumberField' value={this.props.input} onChange={(event) => this.props.handleInput(event)} placeholder='Enter a number here!' />
            </div>
          </form>
          <div className='row'>
            <div className='sharingSection'>
              <label>Share this bento with the following link!</label><span>  </span><input type='text' className='shortenURLField' value={`obento.fun/id=${this.props.id_hash}`} readOnly />
              <button type='button' className='btn btn-success' data-toggle='modal' data-target='#sendSMS' onClick={this.props.clearPhoneNumberInput}>Send via SMS</button>
            </div>
          </div>

            <div className='modal fade' id='sendSMS' tabIndex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
              <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h3 className='modal-title' id='exampleModalLabel'>Share via SMS</h3>
                    <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <div className='modal-body'>
                    <form id='smsForm' onSubmit={(event) => this.props.shareUrlToSMS(event, `http://obento.fun/id=${this.props.id_hash}`, this.props.phoneNumberInput)}>
                      <div className='form-group'>
                        <label className='form-control-label'>Recipient's Phone Number:</label>
                        <input type='tel' className='form-control' id='recipient-name' value={this.props.phoneNumberInput} placeholder='14151234567' onChange={(event) => this.props.handlePhoneNumberInput(event)} />
                      </div>
                    </form>
                  </div>
                  <div className='modal-footer'>
                    <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
                    <button type='button' id='alert-target' className='btn btn-primary' onClick={(event) => this.props.shareUrlToSMS(event, `http://obento.fun/id=${this.props.id_hash}`, this.props.phoneNumberInput)} data-dismiss='modal'>Share</button>
                  </div>
                </div>
              </div>
            </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return { 
    bentoId: state.appReducer.bentoId,
    shortenerId: state.appReducer.shortenerId,
    bentoData: state.displayReducer.bentoData,
    direction: state.displayReducer.direction,
    imgDataFront: state.displayReducer.imgDataFront,
    imgDataBack: state.displayReducer.imgDataBack,
    noriToDisplay: state.displayReducer.noriToDisplay,
    currentNori: state.displayReducer.currentNori,
    isFlipped: state.displayReducer.isFlipped,
    buttonPressed: state.displayReducer.buttonPressed,
    input: state.displayReducer.input,
    title: state.displayReducer.title,
    id_hash: state.displayReducer.id_hash,
    phoneNumberInput: state.displayReducer.phoneNumberInput,
    visit_count: state.displayReducer.visit_count,
  }
}

export default connect(mapStateToProps, { ...displayActions, ...appActions })(Display);
