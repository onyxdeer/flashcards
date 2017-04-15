import { FETCH_NORIS, FETCH_FRONT_IMAGES,
         FETCH_BACK_IMAGES, FETCH_BENTO_METADATA,
         GOTO_PREV_NORI, GOTO_NEXT_NORI,
         FLIP_NORI_TO_FRONT, FLIP_NORI_TO_BACK,
         HANDLE_VIEW_PAGE_INPUT, SET_NORI_NUMBER,
         SHUFFLE_NORIS, SEND_SMS, HANDLE_PHONE_NUMBER_INPUT,
         CLEAR_PHONE_NUMBER_INPUT } from '../actions/actionTypes.js';

const stateDefault = {
  title: '',
  bentoData: [],
  imgDataFront: [],
  imgDataBack: [],
  noriToDisplay: null,
  currentNori: 0,
  isFlipped: false,
  buttonPressed: false,
  input: '',
  id_hash: '',
  url: '',
  phoneNumber: '',
  phoneNumberInput: ''
};

const handleFetchNoris = (state, action) => {
  return {...state, bentoData: action.payload};
}

const handleFetchFrontImages = (state, action) => {
  return {...state, imgDataFront: action.payload};
}

const handleFetchBackImages = (state, action) => {
  return {...state, imgDataBack: action.payload};
}

const handleGetBentoMetaData = (state, action) => {
  return {...state, title: action.title, id_hash: action.id_hash};
}

const handleGoToPrevNori = (state, action) => {
  return {...state, currentNori: action.currentNori, buttonPressed: action.buttonPressed, noriToDisplay: action.noriToDisplay};
}

const handleGoToNextNori = (state, action) => {
  return {...state, currentNori: action.currentNori, buttonPressed: action.buttonPressed, noriToDisplay: action.noriToDisplay};
}

const handleFlipNoriToFront = (state, action) => {
  return {...state, isFlipped: action.isFlipped, buttonPressed: action.buttonPressed};
}

const handleFlipNoriToBack = (state, action) => {
  return {...state, isFlipped: action.isFlipped, buttonPressed: action.buttonPressed};
}

const handleViewPageInputHandler = (state, action) => {
  return {...state, input: action.input};
}

const handlePhoneNumberInput = (state, action) => {
  return {...state, phoneNumberInput: action.phoneNumberInput};
}

const handleClearPhoneNumberInput = (state, action) => {
  return {...state, phoneNumberInput: action.phoneNumberInput};
}

const handleSendSMS = (state, action) => {
    return {...state, url: action.url, phoneNumber: action.phoneNumber};
}

const handleSetNoriNumber = (state, action) => {
  return {...state, currentNori: action.currentNori, noriToDisplay: action.noriToDisplay};
}

const handleShuffleNoris = (state, action) => {
  return {...state, bentoData: action.bentoData, currentNori: action.currentNori, buttonPressed: action.buttonPressed};
}

export default function (state = stateDefault, action) {
    switch (action.type) {
      case FETCH_NORIS:
        return handleFetchNoris(state, action);
        break;
      case FETCH_FRONT_IMAGES:
        return handleFetchFrontImages(state, action);
        break;
      case FETCH_BACK_IMAGES:
        return handleFetchBackImages(state, action);
        break;
      case FETCH_BENTO_METADATA:
        return handleGetBentoMetaData(state, action);
        break;
      case GOTO_PREV_NORI:
        return handleGoToPrevNori(state, action);
        break;
      case GOTO_NEXT_NORI:
        return handleGoToNextNori(state, action);
        break;
      case FLIP_NORI_TO_FRONT:
        return handleFlipNoriToFront(state, action);
        break;
      case FLIP_NORI_TO_BACK:
        return handleFlipNoriToBack(state, action);
        break;
      case HANDLE_VIEW_PAGE_INPUT:
        return handleViewPageInputHandler(state, action);
        break;
      case SET_NORI_NUMBER:
        return handleSetNoriNumber(state, action);
        break;
      case SHUFFLE_NORIS:
        return handleShuffleNoris(state, action);
        break;
      case SEND_SMS:
        return handleSendSMS(state, action);
        break;
      case HANDLE_PHONE_NUMBER_INPUT:
        return handlePhoneNumberInput(state, action);
        break;
      case CLEAR_PHONE_NUMBER_INPUT:
        return handleClearPhoneNumberInput(state, action);
        break;
    }
    return state;
}