// import some actions types

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




export default function(state = {}, action){
  switch(action.type){
    case GET_HELLO:
      return handleGetHello(state, action)
    case WAVE_HELLO:
      return { ...state, data: action.payload}
    case POST_HELLO:
      return handlePostHello(state, action)
  }
  return state
}