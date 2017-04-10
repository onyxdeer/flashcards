var redux = require('redux');

console.log('Starting redux example');

var stateDefault = {
  input: '',
  navExpanded: false,
};

var reducer = (state = stateDefault, action) => {
  // Identical: state = state || stateDefault;
  switch (action.type) {
    case 'CHANGE_INPUT': 
      return {
        ...state,
        input: action.input
      };
    case 'TOGGLE_EXPANDED': 
      return {
        ...state,
        expanded: action.expanded
      };             
    default:
      return state;
    }
};

// createStore: Creates new store / application
// Input needs to be pure function called Reducer
// redux.compose: Lets us run middleware
var store = redux.createStore(reducer, redux.compose(
    // Load in Redux Chrome developer tools
    window.devToolsExtension ? window.devToolsExtension() : f => f
    // If window.devToolsExtension exists, call it as function, otherwise use simple arrow function that does nothing
));

// Subscribe redux method that checks for changes in store
// Callback function will get fired every time state changes
// When call store.subscribe, it actually returns function that you can call to unsubscribe
var unsubscribe = store.subscribe(() => {
    // Store state in state variable
    var state = store.getState();

    console.log('Name is', state.name);
    // Print text to screen
    document.getElementById('app').innerHTML = state.name;

    console.log('New state', store.getState());
});
// unsubscribe();

// getState: Fetch current state of app
var currentState = store.getState();
console.log('currentState', currentState);

// Dispatch action to store, passing in action object
// Every action requires type property
store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Eric'
});

store.dispatch({
    type: 'ADD_HOBBY',
    hobby: 'Running'
});

store.dispatch({
    type: 'ADD_MOVIE',
    title: 'Star Wars',
    genre: 'Sci-Fi'
});

store.dispatch({
    type: 'CHANGE_NAME',
    name: 'Emily'
});
