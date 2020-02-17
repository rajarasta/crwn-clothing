import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils'

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            }

        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }

        /*Prekopira cijeli state, ali updateje prop cartItems sa parametrom koji je prebacen preko payloada*/
        /*Poziva na postjeci cartItems filter, passing cartItem sa i ako ne odgovara cartItem payloadu onda nista
        ako odgovara onda ga izfiltrira. Filter vraca sve sto je true nazad, ono sto nije true izbacuje*/
        /*Na kraju treba bindat cart na checkout-item component*/
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                )
            }

        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)

            }
        default:
            return state;
    }
}

export default cartReducer;