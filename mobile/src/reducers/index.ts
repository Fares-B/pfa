import { combineReducers } from 'redux';

const AppReducers = combineReducers({
    account: require('./account').reducer,
    cart: require('./cart').reducer,
    history: require('./history').reducer,
});


export default AppReducers;
