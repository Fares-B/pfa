import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { HistoryProps, MenuProps } from '@app/globals/types'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    addOrder: ["order"],
    setOrders: ["orders"],
    cancelOrder: ["order"],
})

export const HistoryTypes = Types;
export default Creators;

interface HistoryState {
    orders: HistoryProps[];
};

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    orders: [],
});

/* ------------- Reducers ------------- */

export const addOrder = (state: HistoryState, action: { order: HistoryProps }) => {
    return Immutable.setIn(state, ['orders'], [action.order, ...state.orders]);
}

export const setOrders = (state: HistoryState, action: { orders: HistoryProps[] }) => {
    return Immutable.setIn(state, ['orders'], action.orders);
}

export const cancelOrder = (state: HistoryState, action: { order: MenuProps }) => {
    const orders = state.orders.map(o => {
        if (o._id !== action.order._id) return o;
        return action.order;
    });
    return Immutable.setIn(state, ['orders'], orders);
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_ORDER]: addOrder,
    [Types.SET_ORDERS]: setOrders,
    [Types.CANCEL_ORDER]: cancelOrder,
});
