import axios from 'axios';
import { browserHistory } from 'react-router';

import { FETCH_NORIS, FETCH_FRONT_IMAGES,
         FETCH_BACK_IMAGES, FETCH_BENTO_METADATA,
         GOTO_PREV_NORI, GOTO_NEXT_NORI,
         FLIP_NORI_TO_FRONT, FLIP_NORI_TO_BACK,
         HANDLE_VIEW_PAGE_INPUT, SET_NORI_NUMBER,
         SHUFFLE_NORIS, SEND_SMS, HANDLE_PHONE_NUMBER_INPUT,
         CLEAR_PHONE_NUMBER_INPUT, ANIMATE_BENTO_TRAVERSAL } from './actionTypes.js';



function fetchFrontImages(bentoId) {
  return function(dispatch) {
    return axios.get('/api/images', {
      params: { 
        bento_id: bentoId,
        nori_front: 1
      }
    }).then(function(response) {
      console.log('response from fetchFrontImages:', response.data);
      dispatch({
        type: FETCH_FRONT_IMAGES,
        payload: response.data
      });
    })
  }
}

function fetchBackImages(bentoId) {
  return function(dispatch) {
    return axios.get('/api/images', {
      params: { 
        bento_id: bentoId,
        nori_back: 1
      }
    }).then(function(response) {
      console.log('response from fetchBackImages:', response.data);
      dispatch({
        type: FETCH_BACK_IMAGES,
        payload: response.data
      });
    })
  }
}

function fetchBentoMetaData(bentoId) {
  return function(dispatch) {
    // Get bento title for given bento_id
    axios.get('/api/bentos', {
      params: { id: bentoId }
    }).then(function(response) {
      dispatch({
        type: FETCH_BENTO_METADATA,
        title: response.data[0].name,
        id_hash: response.data[0].id_hash
      })
    });
  }
}

function fetchNoris(bentoId) {
  return function(dispatch) {
    var context = this;
    var idArray = [];
    return axios.get('/api/bentos_noris',{
        params: { bento_id: bentoId }
      })
      .then(function(response) {
        console.log('/api/bentos_noris response:', response.data);
        for (var index = 0; index < response.data.length; index++) {
          idArray.push(response.data[index].nori_id);
        }
        if (idArray.length === 0) {
          dispatch({
            type: FETCH_NORIS,
            payload: [{
              text_front: 'Sorry, no cards available!',
              text_back: 'Try another bento!'
            }]
          })
        } else {
          axios.get('/api/noris', {
            params: { id: idArray }
          }).then(function(response) {
            console.log('/api/noris response:', response.data);
            dispatch({
              type: FETCH_NORIS,
              payload: response.data
            });
          });
        }
      });
    }
}

function nextNori(bentoData, currentNori, direction) {
  return function(dispatch) {
    if (currentNori < bentoData.length - 1) {
      dispatch({
        type: GOTO_NEXT_NORI,
        currentNori: currentNori+=1,
        buttonPressed: true,
        noriToDisplay: bentoData[currentNori]
      });
      flipToFront();
      dispatch({
        type: ANIMATE_BENTO_TRAVERSAL,
        direction: !direction
      });
    }
  }
}

function prevNori(bentoData, currentNori, direction) {
  return function(dispatch) {
    if (currentNori > 0) {
      dispatch({
        type: GOTO_PREV_NORI,
        currentNori: currentNori-=1,
        buttonPressed: true,
        noriToDisplay: bentoData[currentNori]
      });
      flipToFront();
      dispatch({
        type: ANIMATE_BENTO_TRAVERSAL,
        direction: !direction
      });
    }
  }
}

function handleInput(event) {
  return function(dispatch) {
    dispatch({
      type: HANDLE_VIEW_PAGE_INPUT,
      input: event.target.value
    });
  }
}

function handlePhoneNumberInput(event) {
  return function(dispatch) {
    dispatch({
      type: HANDLE_PHONE_NUMBER_INPUT,
      phoneNumberInput: event.target.value
    });
  }
}

function clearPhoneNumberInput() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_PHONE_NUMBER_INPUT,
      phoneNumberInput: ''
    });
  }
}

function setNori(input, bentoData) {
  return function(dispatch) {
    if (input >= 0 && input < bentoData.length) {
      dispatch({
        type: SET_NORI_NUMBER,
        currentNori: input,
        noriToDisplay: bentoData[input]
      });
    } else {
      alert('Invalid nori number, please enter another number.');
    }
  }
}

function shuffleNori(bentoData, direction) {
  return function(dispatch) {
    $('[data-toggle="popover"]').popover('show');
    setTimeout(function() {$('[data-toggle="popover"]').popover('hide')}, 3000);
    var context = this;
    var temp = bentoData.slice();
    var result = [];
    var randomIndex;
    while (temp.length > 0) {
      randomIndex = Math.floor(Math.random() * temp.length);
      result.push(temp[randomIndex]);
      temp.splice(randomIndex, 1);
    }
    flipToFront();
    dispatch({
      type: SHUFFLE_NORIS,
      bentoData: result,
      currentNori: 0,
      buttonPressed: true
    });
    dispatch({
      type: ANIMATE_BENTO_TRAVERSAL,
      direction: !direction
    });
  }
}

function flipToFront() {
  return function(dispatch) {
    dispatch({
      type: FLIP_NORI_TO_FRONT,
      isFlipped: false,
      buttonPressed: false
    });
  }
}

function flipToBack() {
  return function(dispatch) {
    dispatch({
      type: FLIP_NORI_TO_BACK,
      isFlipped: true,
      buttonPressed: false
    });
  }
}

function shareUrlToSMS(event, url, phoneNumber) {
  event.preventDefault();
  return function(dispatch) {
    return axios.post('/api/sms', {
      url: url,
      phoneNumber: phoneNumber
    })
    dispatch({
      type: SEND_SMS,
      url: url,
      phoneNumber: phoneNumber
    });
  }
}

const displayActions = { fetchFrontImages, fetchBackImages,
                         fetchBentoMetaData, fetchNoris,
                         nextNori, prevNori, handleInput,
                         setNori, shuffleNori, flipToFront,
                         flipToBack, shareUrlToSMS,
                         handlePhoneNumberInput, clearPhoneNumberInput };

export default displayActions;