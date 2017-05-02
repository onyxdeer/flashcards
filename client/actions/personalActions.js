import axios from 'axios';
import { browserHistory } from 'react-router';
import { FETCH_USER_BENTOS, FETCH_FAVORITE_BENTOS, FETCH_POPULAR_BENTOS, HANDLE_FETCH_BENTO_FOR_EDIT } from './actionTypes';

function storeBentoIds(response, idArray, bentoData, personal) {
  if (!response) return;
  for (let i = 0; i < response.data.length; i += 1) {
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
    params: { bento_id: idArray },
  })
  .then((response) => {
    const imgData = response.data;
    // Populate the ones with images
    for (let i = 0; i < bentoData.length; i += 1) {
      for (let j = 0; j < imgData.length; j += 1) {
        if (imgData[j].bento_id === bentoData[i].id && imgData[j].nori_front === true) {
          bentoData[i].img_url = imgData[j].url;
          break;
        }
      }
    }
    // Dispatch to proper reducer
    if (category === 'Personal') {
      dispatch({
        type: FETCH_USER_BENTOS,
        payload: bentoData,
      });
    } else if (category === 'Favorite') {
      dispatch({
        type: FETCH_FAVORITE_BENTOS,
        payload: bentoData,
      });
    } else if (category === 'Popular') {
      dispatch({
        type: FETCH_POPULAR_BENTOS,
        payload: bentoData,
      });
    } else {
      console.log('Invalid dispatch in personalActions:', type);
    }
  });
}

const personalActions = {

  // Handle function fetches bento data (including noris) and the possible cover photoafter user clicks an Edit
  handleFetchBentoForEdit(bento, bentoId, userId) {
    return function (dispatch) {
      axios.get('/api/bentos', { params: { id: bentoId, user_id: userId } })
      .then((response) => {
        const data = response.data[0];
        bento.name = data.name;
        bento.description = data.description;
        bento.bento_id = bentoId;
        bento.user_id = userId;
      })
      .then(() => {
        axios.get('/api/bentosNoris', { params: { bento_id: bentoId } })
        .then(response => response.data.map(data => data.nori_id))
        .then((arrayNorisId) => {
          console.log(bentoId)
          const getNoris = axios.get('/api/noris', { params: { id: arrayNorisId } });
          const getImages = axios.get('/api/images', { params: { nori_id: arrayNorisId } });
          const getCoverImage = axios.get('/api/images', {params: {nori_id: null, bento_id: bentoId}})
          Promise.all([getNoris, getImages, getCoverImage])
          .then((response) => {
            const savedNorisArray = response[0].data.map((nori, index) => {
              const newNori = { Front: { image: null, text: null, soundFile: null }, Back: { image: null, text: null, soundFile: null } };
              if (response[1].data) {
                var image = null;
                response[1].data.forEach(function(img) {
                  if(img.nori_id === nori.id){
                    image = img.url;
                  }
                })
                newNori.Front.image = image;
              }
              newNori.Front.text = nori.text_front;
              newNori.Back.text = nori.text_back;
              newNori.Front.soundFile = nori.audio_url_front;
              newNori.Back.soundFile = nori.audio_url_back;
              return newNori;
            });
            if(response[2].data.length) {
              if(response[2].data[0].nori_id === null){
                bento.cover.id = response[2].data[0].id
                bento.cover.url = response[2].data[0]['url']
              }
            } else {
              bento.cover = {id: null, url: null}
            }
            bento.noris = savedNorisArray;
          })
          .then(() => {
            dispatch({ type: HANDLE_FETCH_BENTO_FOR_EDIT, payload: bento });
            browserHistory.push('/edit');
          });
        });
      });
    };
  },

  fetchUser(someData) {
    return function (dispatch) {
      const bentoData = [];
      const idArray = [];
      const imgArray = [];
      // Gets all bentos with particular user_id
      axios.get('/api/bentos', {
        params: { user_id: someData },
      })
      // Stores all bento_ids belonging to user for use in fetchThumbnails
      .then(response => storeBentoIds(response, idArray, bentoData, true))
      // Gets the thumbnails and then finally dispatch
      .then(() => fetchThumbnails(idArray, imgArray, bentoData, dispatch, 'Personal'));
    };
  },

  fetchFavorites(someData) {
    return function (dispatch) {
      const bentoData = [];
      const idArray = [];
      const imgArray = [];
      // get all bento_ids that are user's favorites
      axios.get('/api/labels', {
        params: {
          favorite: true,
          user_id: someData,
        },
      })
      // get bento data
      .then((response) => {
        if (response.data.length === 0) {
          dispatch({
            type: FETCH_FAVORITE_BENTOS,
            payload: [],
          });
        } else {
          return axios.get('/api/bentos', {
            params: {
              id: response.data,
            },
          });
        }
      })
      // pushes bento_ids into an array for fetchThumbnails to use
      .then(response => storeBentoIds(response, idArray, bentoData))
      // gets the thumbnails and then finally dispatch
      .then(() => fetchThumbnails(idArray, imgArray, bentoData, dispatch, 'Favorite'));
    };
  },

  fetchPopular() {
    return function (dispatch) {
      const bentoData = [];
      const idArray = [];
      const imgArray = [];
      // gets first 10 bentos with descending order of visit count
      axios.get('/api/popular')
      // pushes bento_ids into an array for fetchThumbnails to use
      .then(response => storeBentoIds(response, idArray, bentoData))
      // gets the thumbnails and then finally dispatch
      .then(() => fetchThumbnails(idArray, imgArray, bentoData, dispatch, 'Popular'));
    };
  },
};

export default personalActions;
