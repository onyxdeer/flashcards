import React, { Component } from 'react';
import displayActions from '../../actions/displayActions.js';
import * as appActions from '../../actions/appActions.js';
import personalActions from '../../actions/personalActions.js';
import { connect } from 'react-redux';
import BentoSection from './BentoSection/BentoSection.jsx';
import ButtonSection from './ButtonSection/ButtonSection.jsx';
import ChangeToNoriSection from './ChangeToNoriSection/ChangeToNoriSection.jsx';
import SharingSection from './SharingSection/SharingSection.jsx';
import Modal from '../Voice/Modal.jsx'

let userId = 1;

class Display extends Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleVisitCountIncrement = this.handleVisitCountIncrement.bind(this);

    this.props.fetchBentoMetaData((this.props.shortenerId ? this.props.shortenerId : this.props.bentoId), this.handleVisitCountIncrement);
    this.props.fetchFrontImages(this.props.shortenerId ? this.props.shortenerId : this.props.bentoId);
    this.props.fetchBackImages(this.props.shortenerId ? this.props.shortenerId : this.props.bentoId);
    this.props.fetchNoris(this.props.shortenerId ? this.props.shortenerId : this.props.bentoId);
    this.props.resetCurrentNori();

    $.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
          console.log('REMOVING ANIMATION');
            $(this).removeClass('animated ' + animationName);
            });
        }
    });

  }

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidMount() {

    var context = this;

    $('.index-card').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      console.log('REMOVING ANIMATION');
      $('.index-card').removeClass('animated bounce');
    });

    this.props.clearShortenerId();
  }
  
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    this.props.flipToFront();
    $('.index-card').removeClass('animated bounce');
  }

  handleVisitCountIncrement () {
    this.props.incrementVisitCount(this.props.bentoId, this.props.visit_count);
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
    return (
      <div>
        <Modal />
        <div className='row'>
          <h1 className='default-font create-title'>Bento: {this.props.title}</h1>
        </div>
        <BentoSection />
        <ButtonSection userId={userId}/>
        <ChangeToNoriSection />
        <SharingSection />
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
    currentNori: state.displayReducer.currentNori,
    title: state.displayReducer.title,
    visit_count: state.displayReducer.visit_count,
  }
}

export default connect(mapStateToProps, { ...displayActions, ...appActions })(Display);