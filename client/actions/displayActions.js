import axios from 'axios';
import { FETCH_NORIS, FETCH_FRONT_IMAGES,
         FETCH_BACK_IMAGES, FETCH_BENTO_METADATA,
         GOTO_PREV_NORI, GOTO_NEXT_NORI,
         FLIP_NORI_TO_FRONT, FLIP_NORI_TO_BACK,
         HANDLE_VIEW_PAGE_INPUT, SET_NORI_NUMBER,
         SHUFFLE_NORIS, SEND_SMS, HANDLE_PHONE_NUMBER_INPUT,
         CLEAR_PHONE_NUMBER_INPUT, ANIMATE_BENTO_TRAVERSAL,
         RESET_CURRENT_NORI } from './actionTypes';

function flipToFront() {
  return function (dispatch) {
    dispatch({
      type: FLIP_NORI_TO_FRONT,
      isFlipped: false,
      buttonPressed: false,
    });
  };
}

function flipToBack() {
  return function (dispatch) {
    dispatch({
      type: FLIP_NORI_TO_BACK,
      isFlipped: true,
      buttonPressed: false,
    });
  };
}

function resetCurrentNori() {
  return function (dispatch) {
    dispatch({
      type: RESET_CURRENT_NORI,
      currentNori: 0,
    });
  };
}

function fetchFrontImages(bentoId) {
  return function (dispatch) {
    return axios.get('/api/images', {
      params: {
        bento_id: bentoId,
        nori_front: 1,
      },
    }).then((response) => {
      dispatch({
        type: FETCH_FRONT_IMAGES,
        payload: response.data,
      });
    });
  };
}

function fetchBackImages(bentoId) {
  return function (dispatch) {
    return axios.get('/api/images', {
      params: {
        bento_id: bentoId,
        nori_back: 1,
      },
    }).then((response) => {
      dispatch({
        type: FETCH_BACK_IMAGES,
        payload: response.data,
      });
    });
  };
}

function fetchBentoMetaData(bentoId, cb) {
  return function (dispatch) {
    // Get bento title for given bento_id
    axios.get('/api/bentos', {
      params: { id: bentoId },
    })
    .then((response) => {
      dispatch({
        type: FETCH_BENTO_METADATA,
        title: response.data[0].name,
        id_hash: response.data[0].id_hash,
        visit_count: response.data[0].visit_count,
      });
    })
    .then(() => {
      cb();
    });
  };
}

function fetchNoris(bentoId) {
  return function (dispatch) {
    const idArray = [];
    return axios.get('/api/bentosNoris', {
      params: { bento_id: bentoId },
    })
    .then((response) => {
      for (let index = 0; index < response.data.length; index += 1) {
        idArray.push(response.data[index].nori_id);
      }
      if (idArray.length === 0) {
        dispatch({
          type: FETCH_NORIS,
          payload: [{
            text_front: 'Sorry, no cards available!',
            text_back: 'Try another bento!',
          }],
        });
      } else {
        axios.get('/api/noris', {
          params: { id: idArray },
        }).then(() => {
          dispatch({
            type: FETCH_NORIS,
            payload: response.data,
          });
        });
      }
    });
  };
}

function nextNori(bentoData, currentNori, direction) {
  return function (dispatch) {
    if (currentNori < bentoData.length - 1) {
      dispatch({
        type: GOTO_NEXT_NORI,
        currentNori: currentNori += 1,
        buttonPressed: true,
        noriToDisplay: bentoData[currentNori],
      });
      flipToFront();
      dispatch({
        type: ANIMATE_BENTO_TRAVERSAL,
        direction: !direction,
      });
    }
  };
}

function prevNori(bentoData, currentNori, direction) {
  return function (dispatch) {
    if (currentNori > 0) {
      dispatch({
        type: GOTO_PREV_NORI,
        currentNori: currentNori -= 1,
        buttonPressed: true,
        noriToDisplay: bentoData[currentNori],
      });
      flipToFront();
      dispatch({
        type: ANIMATE_BENTO_TRAVERSAL,
        direction: !direction,
      });
    }
  };
}

function handleInput(event) {
  return function (dispatch) {
    dispatch({
      type: HANDLE_VIEW_PAGE_INPUT,
      input: event.target.value,
    });
  };
}

function handlePhoneNumberInput(event) {
  return function (dispatch) {
    dispatch({
      type: HANDLE_PHONE_NUMBER_INPUT,
      phoneNumberInput: event.target.value,
    });
  };
}

function clearPhoneNumberInput() {
  return function (dispatch) {
    dispatch({
      type: CLEAR_PHONE_NUMBER_INPUT,
      phoneNumberInput: '',
    });
  };
}

function setNori(input, bentoData) {
  return function (dispatch) {
    if (input >= 0 && input < bentoData.length) {
      dispatch({
        type: SET_NORI_NUMBER,
        currentNori: input,
        noriToDisplay: bentoData[input],
      });
    } else {
      alert('Invalid nori number, please enter another number.');
    }
  };
}

function shuffleNori(bentoData, direction) {
  return function (dispatch) {
    $('[data-toggle="popover"]').popover('show');
    setTimeout(() => { $('[data-toggle="popover"]').popover('hide'); }, 3000);
    const temp = bentoData.slice();
    const result = [];
    let randomIndex;
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
      buttonPressed: true,
    });
    dispatch({
      type: ANIMATE_BENTO_TRAVERSAL,
      direction: !direction,
    });
  };
}

function shareUrlToSMS(event, url, phoneNumber) {
  event.preventDefault();
  return function (dispatch) {
    return axios.post('/api/sms', {
      url: url,
      phoneNumber: phoneNumber,
    });
  };
}

function incrementVisitCount(id, current_count) {
  return function (dispatch) {
    return axios.post('/api/visits', {
      bento_id: id,
      visit_count: current_count += 1,
    });
  };
}

const displayActions = { fetchFrontImages, fetchBackImages, fetchBentoMetaData, fetchNoris, nextNori, prevNori, handleInput, setNori, shuffleNori, flipToFront, flipToBack, shareUrlToSMS, handlePhoneNumberInput, clearPhoneNumberInput, resetCurrentNori, incrementVisitCount };

export default displayActions;
