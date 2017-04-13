import axios from 'axios';
import { browserHistory } from 'react-router';

import { FIND_BENTOS } from './actionTypes.js'

export function searchBentos(someData, someMoreData) {
  return function(dispatch) {
    var bentoData = [];
    var idArray = [];
    var imgArray = [];
    console.log('Calling api from searchBentos with:', someData);
    axios.get('/api/bentos', {
      params: { name: someData }
    })
    .then(response => storeBentoIds(response, idArray, bentoData))
    .then(() => fetchThumbnails(idArray, imgArray, bentoData, dispatch));
  }
}

function storeBentoIds(response, idArray, bentoData) {
  for (var i = 0; i < response.data.length; i++ ) {
    if (!response.data[i].private) {
      bentoData.push(response.data[i]);
      idArray.push(response.data[i].id);
    }
  }
}

function fetchThumbnails(idArray, imgArray, bentoData, dispatch) {
  console.log('calling fetchThumbnails');
  return axios.get('/api/thumbnails', {
    params: { bento_id: idArray }
  })
  .then(function(response) {
    var imgData = response.data;
    // populate the ones with images
    for (var i = 0; i < bentoData.length; i++) {
      for (var j = 0; j < imgData.length; j++) {
        if (imgData[j].bento_id === bentoData[i].id) {
          bentoData[i].img_url = imgData[j].url;
        }
      }
    }
    dispatch({
      type: FIND_BENTOS,
      payload: bentoData
    });
  });
}

function handleError(error){
  return {
    type: SAMPLE_REQUEST_ERROR,
    payload: error
  }
}