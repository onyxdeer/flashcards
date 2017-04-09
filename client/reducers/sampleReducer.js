// import some actions types
import { GET_HELLO, WAVE_HELLO, POST_HELLO } from '../actions/actionTypes.js'

// NOTES: es6 version, using ({}) after fat arrow allows us to implicitly put return in front of the object
const handleGetHello = (state, action) => ({
  ...state, data: action.payload + 'hello world'
})

// NOTES: normal function version
function handlePostHello(state, action){
  // babel ...state syntax allows you to put the rest of the state inside this object you're returning
  // just like spread operator in arrays

  // put whatever logic you need to handle here
  return { 
    ...state, 
    data: action.payload 
  }
}


const DEFAULT_STATE = { data: [] }

// we're exporting this function essentially as default, so when we import from another function using syntax 
// import x from './sampleReducers.js'
// the x is the alias variable you want to name it as
// next the es6 feature state=DEFAULT_STATE means if state isn't a variable it'll default to the variable DEFAULT_STATE which we defined above, the reason we want to have a default state is because state has initial state and when state changes it's just a different snap shot of the state. so essentially react components are syncd to the state(whcih can change over time), and in order to sync this we need to also handle the case where the state is at the beginning when it hasn't been updated.
export default function(state = DEFAULT_STATE, action){
  switch(action.type){
    case GET_HELLO:
      //call a handler function to handle it so we can decouple the logic from reducer for clearer code
      // make sure you pass state, and action to the handler function or else you can't access these 2 
      // critical variables
      return handleGetHello(state, action)
    case WAVE_HELLO:
      // can also just directly write the logic in here, but that's not good practice
      return { ...state, data: action.payload + 'I waved hello'}
    case POST_HELLO:
      return handlePostHello(state, action)
  }
  return state
}