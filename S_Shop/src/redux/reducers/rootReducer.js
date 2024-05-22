import {combineReducers} from 'redux';
import themeReducer from './ThemeReducer';
import {profileReudcer} from './ProfileReducer';
import cartReducer from './CartReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  profile: profileReudcer,
  cart: cartReducer,
});

export default rootReducer;
