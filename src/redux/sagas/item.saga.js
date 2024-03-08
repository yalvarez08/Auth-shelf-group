import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchItems() {
    try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
    
        const response = yield axios.get('/api/shelf', config);
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
    
        yield axios.post('/api/shelf', action.payload, config);
        yield put({type: 'FETCH_ITEMS'});
        yield put({ type: 'SET_ITEM', payload: action.payload});
      } catch (error) {
        console.log('POST /api/shelf request failed:', error);
      }
    }

function* DeleteFromShelf(action) {
    console.log('deleted item payload:', action.payload)
    try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
        yield axios.delete(`/api/shelf/${action.payload}`, config);
        console.log('payload.id', action.payload);
        yield put({type: 'FETCH_ITEMS'});
    } catch (error) {
        console.log('DELETE /api/shelf item request failed:', error);
    }
}

function* itemSaga() {
    yield takeLatest('FETCH_ITEMS', fetchItems);
    yield takeLatest('ADD_ITEM', AddItemToShelf);
    yield takeLatest('DELETE_ITEM', DeleteFromShelf);
  }

export default itemSaga;