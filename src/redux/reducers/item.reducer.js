const itemReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ITEM':
        return action.payload;
      default:
        return state;
    }
  };
  
  // item will be on the redux state at:
  // state.item
  export default itemReducer;