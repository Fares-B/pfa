'use strict'
import { createStore, applyMiddleware, compose } from 'redux';

import AppReducers from '../reducers';

function configureStore() {
    const store = createStore(AppReducers);
    return store;
}

export const Store = configureStore();

export default Store;
