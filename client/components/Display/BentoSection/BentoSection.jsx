import React, { Component } from 'react';
import Deck from 'react-deck';
import classnames from 'classnames';
import Swipeable from 'react-swipeable';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import displayActions from '../../../actions/displayActions.js';
import { connect } from 'react-redux';

class BentoSection extends Component {
  constructor(props) {
    super(props);

    this.getSortedNoris = this.getSortedNoris.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.renderNori = this.renderNori.bind(this);
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

  getSortedNoris () {
    let stackSize = this.props.bentoData.length >= 10 ? 10 : this.props.bentoData.length;
    return this.props.bentoData
      .slice(this.props.currentNori)
      .concat(this.props.bentoData.slice(0, this.props.currentNori))
      .slice(0, stackSize) // for performance
      .reverse();
  }

  renderNori (nori, index , noris) {
    const className = classnames('index-card', {
      'card-flipped': index === noris.length - 1 && this.props.isFlipped && !this.props.buttonPressed,
      'no-animation': this.props.buttonPressed,
      'animated bounce': index === noris.length - 1,
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

  render() {
    return (
      <div className='row'>
        {this.props.bentoData&&(this.props.bentoData.length > 0) ? <Swipeable
          onSwipedLeft={() => this.props.prevNori(this.props.bentoData, this.props.currentNori, this.props.direction)}
          onSwipedRight={() => this.props.nextNori(this.props.bentoData, this.props.currentNori, this.props.direction)}>
            <div className='cardSection'>
              <Deck>
                {this.getSortedNoris().map(this.renderNori, this)}
              </Deck>
            </div>
        </Swipeable> : <h1 className='center-block'>Loading Noris...</h1> }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bentoData: state.displayReducer.bentoData,
    direction: state.displayReducer.direction,
    imgDataFront: state.displayReducer.imgDataFront,
    imgDataBack: state.displayReducer.imgDataBack,
    currentNori: state.displayReducer.currentNori,
    isFlipped: state.displayReducer.isFlipped,
    buttonPressed: state.displayReducer.buttonPressed,
  }
}

export default connect(mapStateToProps, { ...displayActions })(BentoSection);