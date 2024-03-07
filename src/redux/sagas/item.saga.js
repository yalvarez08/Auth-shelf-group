import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchItems() {
    try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
    
        // the config includes credentials which
        // allow the server session to recognize the user
        // If a user is logged in, this will return their information
        // from the server session (req.user)
        const response = yield axios.get('/api/shelf', config);
    
        // now that the session has given us a user object
        // with an id and username set the client-side user object to let
        // the client-side code know the user is logged in
        yield put({ type: 'SET_ITEM', payload: response.data });
      } catch (error) {
        console.log('GET /api/shelf request failed:', error);
      }
    }

function* AddItemToShelf(action) {
    console.log('added item payload:', action.payload)
    try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
    
        yield axios.post('/api/shelf', config, action.payload);
        yield put({ type: 'SET_ITEM', payload: action.payload});
      } catch (error) {
        console.log('POST /api/shelf request failed:', error);
      }
    }

function* itemSaga() {
    yield takeLatest('FETCH_ITEMS', fetchItems);
    yield takeLatest('ADD_ITEM', AddItemToShelf);

  }

export default itemSaga;