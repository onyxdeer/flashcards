import axios from 'axios';
import { browserHistory , path } from 'react-router';
import { push } from 'react-router-redux'
import { FETCH_USER_BENTOS, FETCH_FAVORITE_BENTOS, FETCH_POPULAR_BENTOS, HANDLE_FETCH_BENTO_FOR_EDIT } from './actionTypes.js';

const personalActions = {

  //this handle function is used to fetch the bento data(including noris) after a user has clicked an Edit++++++++++++

  handleFetchBentoForEdit: function (bento, bentoId, userId) {
  return function(dispatch) {
    axios.get('/api/bentos', {params: {id: bentoId, user_id: userId}})
    .then((response)=>{
      var data = response.data[0];
      bento.name = data.name;
      bento.description = data.description;
      bento.bento_id = bentoId;
      bento.user_id = userId;
    })
    .then(() => {
      axios.get('/api/bentos_noris', {params: {bento_id: bentoId}})
      .then((response) => {
        return response.data.map((data) => {return data.nori_id})
      })
      .then((arrayNorisId) => {
        var getNoris = axios.get('/api/noris', {params: {id: arrayNorisId}})
        var getImages = axios.get('/api/images', {params: {nori_id: arrayNorisId}})
        console.log("CAN ANYBODY HEAR ME", arrayNorisId)
        Promise.all([getNoris, getImages])
        .then((response) => {
          var savedNorisArray = response[0].data.map(function(nori, index){
            var newNori = {Front: {image: null, text:null, soundFile: null}, Back: {image: null, text:null, soundFile: null}}
            newNori.Front.image = response[1].data[index]['url'];
            newNori.Front.text = nori.text_front;
            newNori.Back.text = nori.text_back;
            newNori.Front.soundFile = nori.audio_url_front;
            newNori.Back.soundFile = nori.audio_url_back;
            return newNori
          })
          bento.noris = savedNorisArray;
        })
        .then(() => {
            dispatch({type: HANDLE_FETCH_BENTO_FOR_EDIT, payload: bento});
            browserHistory.push('/edit')
        })
      })
    })
  }},
  
    fetchUser: function(someData, someMoreData) {
      return function(dispatch) {
        var bentoData = [];
        var idArray = [];
        var imgArray = [];
        // gets all bentos with particular user_id
        axios.get('/api/bentos', {
          params: { user_id: someData }
        })
        // stores all bento_ids belonging to user for use in fetchThumbnails
        .then(response => storeBentoIds(response, idArray, bentoData, true))
        // gets the thumbnails and then finally dispatch
        .then(() => fetchThumbnails(idArray, imgArray, bentoData, dispatch, 'Personal'));
      }
    },

    fetchFavorites: function(someData, someMoreData) {
      return function(dispatch) {
        var bentoData = [];
        var idArray = [];
        var imgArray = [];;
        // get all bento_ids that are user's favorites
        axios.get('/api/labels', {
          params: {
            favorite: true,
            user_id: someData
          }
        })
        // get bento data
        .then(response => {;
          if (response.data.length === 0) {
            dispatch({
              type: FETCH_FAVORITE_BENTOS,
              payload: []
            });
          } else {
            return axios.get('/api/bentos', {
              params: {
                id: response.data
              }
            });
          }
        })
        // pushes bento_ids into an array for fetchThumbnails to use
        .then(response => storeBentoIds(response, idArray, bentoData))
        // gets the thumbnails and then finally dispatch
        .then(() => fetchThumbnails(idArray, imgArray, bentoData, dispatch, 'Favorite'));
      }
    },

    fetchPopular: function(someData, someMoreData) {
      return function(dispatch) {
        var bentoData = [];
        var idArray = [];
        var imgArray = [];
        // gets first 10 bentos with descending order of visit count
        axios.get('/api/popular')
        // pushes bento_ids into an array for fetchThumbnails to use
        .then(response => storeBentoIds(response, idArray, bentoData))
        // gets the thumbnails and then finally dispatch
        .then(() => fetchThumbnails(idArray, imgArray, bentoData, dispatch, 'Popular'));
      }
    }

}

function storeBentoIds(response, idArray, bentoData, personal) {
  if (!response) return;
  for (var i = 0; i < response.data.length; i++ ) {
    if (personal) {
      bentoData.push(response.data[i]);
      idArray.push(response.data[i].id);
    } else if (!response.data[i].private) {
      bentoData.push(response.data[i]);
      idArray.push(response.data[i].id);
    }
  }
}

function fetchThumbnails(idArray, imgArray, bentoData, dispatch, category) {
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
          break;
        }
      }
    }
    // dispatch to proper reducer
    if (category === 'Personal') {
      dispatch({
        type: FETCH_USER_BENTOS,
        payload: bentoData
      });
    } else if (category === 'Favorite') {
      dispatch({
        type: FETCH_FAVORITE_BENTOS,
        payload: bentoData
      });
    } else if (category === 'Popular') {
      dispatch({
        type: FETCH_POPULAR_BENTOS,
        payload: bentoData
      });
    } else {
      console.log('Invalid dispatch in personalActions:', type);
    }
  });
}

export default personalActions;