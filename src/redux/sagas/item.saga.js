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

function* itemSaga() {
    yield takeLatest('FETCH_ITEMS', fetchItems);
  }

export default itemSaga;