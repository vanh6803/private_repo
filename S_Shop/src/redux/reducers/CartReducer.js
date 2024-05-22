import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  FETCH_CART_FAIL,
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  UPDATE_CART_QUANTITY,
} from '../actionType';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        error: null,
      };
    case FETCH_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case ADD_TO_CART:
      return {
        ...state,
        data: [...state.data, action.payload.item],
      };
    case DELETE_FROM_CART:
      return {
        ...state,
        data: state.data.filter(item => item._id !== action.payload.itemId),
      };
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        data: state.data.map(item =>
          item._id === action.payload.itemId
            ? {...item, quantity: action.payload.quantity}
            : item,
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
