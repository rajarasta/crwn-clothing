import userReducer from './user/user-reducer.js';
import { combineReducers } from 'redux';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer.js';

import { persistReducer } from 'redux-persist';
import shopReducer from './shop/shop.reducer.js'

/*Uzima drugi library ako hoce session storage, ovaj library je za localStorage
Local Storage persista izmedu zatvaranja browsera*/
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
})

export default persistReducer(persistConfig, rootReducer);