import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { MenuProps } from '@app/globals/types'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    resetState: null,
    addMenu: ["menu"],
    removeMenu: ["timestamp"],
})

interface CartProps {
    menus: MenuProps[];
};

export const CartTypes = Types
export default Creators


/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable<CartProps>({
    menus: [],
})

/* ------------- Reducers ------------- */
export const resetState = (state: CartProps) => INITIAL_STATE;

export const addMenu = (state: CartProps, action: { menu: MenuProps }) => {
    return Immutable.setIn(state, ['menus'], [...state.menus, action.menu]);
}

export const removeMenu = (state: CartProps, action: { timestamp: number }) => {
    return Immutable.setIn(state, ['menus'],
        state.menus.filter(menu => menu.timestamp !== action.timestamp));
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.RESET_STATE]: resetState,
    [Types.ADD_MENU]: addMenu,
    [Types.REMOVE_MENU]: removeMenu,
});
