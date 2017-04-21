import axios from 'axios';
import { browserHistory } from 'react-router';

import { FIND_BENTOS } from './actionTypes.js'

export function searchBentos(someData, someMoreData) {
  return function(dispatch) {
    var bentoData = [];
    var idArray = [];
    var imgArray = [];
    console.log('Calling api from searchBentos with:', someData);
    axios.get('/api/search', {
      params: { someData }
      // Search database method:
      // params: { name: someData }
    })
    .then(response => storeBentoIds(response, idArray, bentoData))
    .then(() => fetchThumbnails(idArray, imgArray, bentoData, dispatch));
  }
}

// NEW VERSION: Fetching from AWS ES
function storeBentoIds(response, idArray, bentoData) {
  console.log('Response: ', response);
  for (var i = 0; i < response.data.length; i++ ) {
    if (!response.data[i]._source.private) {
      bentoData.push(response.data[i]._source);
      idArray.push(response.data[i]._source.id);
      console.log('BentoData: ', bentoData);
      console.log('idArray: ', idArray);
    }
  }
}

// OLD VERSION: Fetching from database instead of AWS ES
// function storeBentoIds(response, idArray, bentoData) {
//   for (var i = 0; i < response.data.length; i++ ) {
//     if (!response.data[i].private) {
//       bentoData.push(response.data[i]);
//       idArray.push(response.data[i].id);
//     }
//   }
// }

// NEW VERSION: Fetching from AWS ES
// function fetchThumbnails(idArray, imgArray, bentoData, dispatch) {
//   return axios.get('/api/searchThumbnails', {
//     params: { idArray }
//   })
//   .then(function(response) {
//     console.log('fetchTHumbnails response: ', response.data);
//     console.log('fetchthumbnails bento data: ', bentoData);    
//     var imgData = response.data;
//     // populate the ones with images
//     for (var i = 0; i < bentoData.length; i++) {
//       for (var j = 0; j < imgData.length; j++) {
//         if (imgData[j].bento_id === bentoData[i].id && imgData[j].nori_id === null) {
//           bentoData[i].img_url = imgData[j]._source.url;
//         }
//       }
//     }
//     dispatch({
//       type: FIND_BENTOS,
//       payload: bentoData
//     });
//   });
// }

// OLD VERSION: Fetching from database instead of AWS ES
function fetchThumbnails(idArray, imgArray, bentoData, dispatch) {
  console.log('calling fetchThumbnails');
  return axios.get('/api/thumbnails', {
    params: { bento_id: idArray }
  })
  .then(function(response) {
    console.log('fetchTHumbnails response: ', response.data);
    console.log('fetchthumbnails bento data: ', bentoData);
    var imgData = response.data;
    // populate the ones with images
    for (var i = 0; i < bentoData.length; i++) {
      for (var j = 0; j < imgData.length; j++) {
        if (imgData[j].bento_id === bentoData[i].id && imgData[j].nori_id === null) {
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