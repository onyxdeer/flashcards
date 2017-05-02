import axios from 'axios';
import { FIND_BENTOS } from './actionTypes';

// NEW VERSION: Fetching from AWS ES
function storeBentoIds(response, idArray, bentoData) {
  for (let i = 0; i < response.data.length; i += 1) {
    if (!response.data[i]._source.private) {
      bentoData.push(response.data[i]._source);
      idArray.push(response.data[i]._source.id);
    }
  }
}

// OLD VERSION: Fetching from database
function fetchThumbnails(idArray, imgArray, bentoData, dispatch) {
  return axios.get('/api/thumbnails', {
    params: { bento_id: idArray },
  })
  .then((response) => {
    const imgData = response.data;
    // populate the ones with images
    for (let i = 0; i < bentoData.length; i += 1) {
      for (let j = 0; j < imgData.length; j += 1) {
        if (imgData[j].bento_id === bentoData[i].id && imgData[j].nori_id === null) {
          bentoData[i].img_url = imgData[j].url;
        }
      }
    }
    dispatch({
      type: FIND_BENTOS,
      payload: bentoData,
    });
  });
}

export function searchBentos(someData) {
  return (dispatch) => {
    const bentoData = [];
    const idArray = [];
    const imgArray = [];
    axios.get('/api/search', {
      params: { someData },
    })
    .then(response => storeBentoIds(response, idArray, bentoData))
    .then(() => fetchThumbnails(idArray, imgArray, bentoData, dispatch));
  };
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
//   return axios.get('/api/search_thumbnails', {
//     params: { idArray }
//   })
//   .then(function(response) {
//     console.log('IMGDATA: ', response.data);
//     var imgData = response.data;
//     // populate the ones with images
//     for (var i = 0; i < bentoData.length; i++) {
//       for (var j = 0; j < imgData.length; j++) {
//         if (imgData[j]._source.bento_id === bentoData[i].id) {
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
