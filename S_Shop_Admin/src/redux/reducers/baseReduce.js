const createReducer = (actions) => {
  const initialState = {
    loading: false,
    data: null,
    error: null,
  };

  return (state = initialState, action) => {
    // console.log('reducer - ', action.type);
    switch (action.type) {
      case actions.REQUEST:
        return {
          ...state,
          loading: true,
        };
      case actions.SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload.data,
          error: null,
        };
      case actions.FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };
      default:
        return state;
    }
  };
};

export default createReducer;
