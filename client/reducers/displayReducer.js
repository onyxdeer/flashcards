import { FETCH_NORIS, FETCH_FRONT_IMAGES,
         FETCH_BACK_IMAGES, FETCH_BENTO_METADATA,
         GOTO_PREV_NORI, GOTO_NEXT_NORI,
         FLIP_NORI_TO_FRONT, FLIP_NORI_TO_BACK,
         HANDLE_VIEW_PAGE_INPUT, SET_NORI_NUMBER,
         SHUFFLE_NORIS, SEND_SMS, HANDLE_PHONE_NUMBER_INPUT,
         CLEAR_PHONE_NUMBER_INPUT, ANIMATE_BENTO_TRAVERSAL,
         RESET_CURRENT_NORI } from '../actions/actionTypes';

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
  phoneNumberInput: '',
  direction: true,
  visit_count: null,
};

const handleResetCurrentNori = (state, action) => ({
  ...state,
  currentNori: action.currentNori,
  input: action.input,
});

const handleFetchNoris = (state, action) => ({
  ...state,
  bentoData: action.payload,
});

const handleFetchFrontImages = (state, action) => ({
  ...state,
  imgDataFront: action.payload,
});

const handleFetchBackImages = (state, action) => ({
  ...state,
  imgDataBack: action.payload,
});

const handleGetBentoMetaData = (state, action) => ({
  ...state,
  title: action.title,
  id_hash: action.id_hash,
  visit_count: action.visit_count,
});

const handleGoToPrevNori = (state, action) => ({
  ...state,
  currentNori: action.currentNori,
  buttonPressed: action.buttonPressed,
  noriToDisplay: action.noriToDisplay,
});

const handleGoToNextNori = (state, action) => ({
  ...state,
  currentNori: action.currentNori,
  buttonPressed: action.buttonPressed,
  noriToDisplay: action.noriToDisplay,
});

const handleFlipNoriToFront = (state, action) => ({
  ...state,
  isFlipped: action.isFlipped,
  buttonPressed: action.buttonPressed,
});

const handleFlipNoriToBack = (state, action) => ({
  ...state,
  isFlipped: action.isFlipped,
  buttonPressed: action.buttonPressed,
});

const handleViewPageInputHandler = (state, action) => ({
  ...state,
  input: action.input,
});

const handlePhoneNumberInput = (state, action) => ({
  ...state,
  phoneNumberInput: action.phoneNumberInput,
});

const handleClearPhoneNumberInput = (state, action) => ({
  ...state,
  phoneNumberInput: action.phoneNumberInput,
});

const handleSendSMS = (state, action) => ({
  ...state,
  url: action.url,
  phoneNumber: action.phoneNumber,
});

const handleSetNoriNumber = (state, action) => ({
  ...state,
  currentNori: action.currentNori,
  noriToDisplay: action.noriToDisplay,
});

const handleShuffleNoris = (state, action) => ({
  ...state,
  bentoData: action.bentoData,
  currentNori: action.currentNori,
  buttonPressed: action.buttonPressed,
});

const handleBentoTraversalAnimation = (state, action) => ({
  ...state,
  direction: action.direction,
});

export default (state = stateDefault, action) => {
  switch (action.type) {
    case FETCH_NORIS:
      return handleFetchNoris(state, action);
    case FETCH_FRONT_IMAGES:
      return handleFetchFrontImages(state, action);
    case FETCH_BACK_IMAGES:
      return handleFetchBackImages(state, action);
    case FETCH_BENTO_METADATA:
      return handleGetBentoMetaData(state, action);
    case GOTO_PREV_NORI:
      return handleGoToPrevNori(state, action);
    case GOTO_NEXT_NORI:
      return handleGoToNextNori(state, action);
    case FLIP_NORI_TO_FRONT:
      return handleFlipNoriToFront(state, action);
    case FLIP_NORI_TO_BACK:
      return handleFlipNoriToBack(state, action);
    case HANDLE_VIEW_PAGE_INPUT:
      return handleViewPageInputHandler(state, action);
    case SET_NORI_NUMBER:
      return handleSetNoriNumber(state, action);
    case SHUFFLE_NORIS:
      return handleShuffleNoris(state, action);
    case SEND_SMS:
      return handleSendSMS(state, action);
    case HANDLE_PHONE_NUMBER_INPUT:
      return handlePhoneNumberInput(state, action);
    case CLEAR_PHONE_NUMBER_INPUT:
      return handleClearPhoneNumberInput(state, action);
    case ANIMATE_BENTO_TRAVERSAL:
      return handleBentoTraversalAnimation(state, action);
    case RESET_CURRENT_NORI:
      return handleResetCurrentNori(state, action);
    default:
      return state;
  }
};
