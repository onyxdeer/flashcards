import {HANDLE_FETCH_BENTO_FOR_EDIT} from './actionTypes.js'

function handleFetchBentoForEdit (bento, bentoId, userId) {
  axios.get('/api/bentos', {params: {id: bentoId, userId}})
  .then((response)=>{
    var data = response.data[0];
    bento.name = data.name;
    bento.description = data.description;
    bento.bento_id = bentoId;
    bento.user_id = userId;
    
  })
  return(dispatch) {
    dispatch({type: HANDLE_FETCH_BENTO_FOR_EDIT, payload: bento})
  } 
}