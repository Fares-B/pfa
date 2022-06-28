import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    getUserProfileRequest: null,
    getUserProfileSuccess: ["user"],
    getUserProfileFailure: ["error"],

    updateProfileRequest: ["callback"],
    updateProfileFailure: ["error"],
    updateProfileSuccess: ["user"],
    
    setEstablishment: ["establishment"],
    setToken: ["token"],
    setLoading: ["loading"],
})

export const AccountTypes = Types
export default Creators


/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    user: {},
    token: null,
    establishment: null,
    action: {
        loading: false,
        error: ""
    }
})

/* ------------- Reducers ------------- */
export const getUserProfileRequest = (state: any, action: any) => {
    let nextSate = Immutable.setIn(state, ["action", 'loading'], true)
    return Immutable.setIn(nextSate, ["action", 'error'], "")
}


export const getUserProfileFailure = (state: any, action: { error: any }) => {
    let nextSate = Immutable.setIn(state, ["action", 'loading'], false)
    return Immutable.setIn(nextSate, ["action", 'error'], action.error)
}

export const getUserProfileSuccess = (state: any, action: { user: any }) => {
    let nextSate = Immutable.setIn(state, ["action", 'loading'], false)
    return Immutable.setIn(nextSate, ['user'], action.user)
}


export const updateProfileRequest = (state: any, action: any) => {
    let nextSate = Immutable.setIn(state, ["action", 'loading'], true);
    return Immutable.setIn(nextSate, ["action", 'error'], "");
}

export const updateProfileFailure = (state: any, action: { error: any }) => {
    let nextSate = Immutable.setIn(state, ["action", 'loading'], false);
    return Immutable.setIn(nextSate, ["action", 'error'], action.error);
}

export const updateProfileSuccess = (state: any, action: any) => {
    const nextSate = Immutable.setIn(state, ["action", 'loading'], false);
    return Immutable.setIn(nextSate, ['user'], action.user)
}

// establish connection with the server
export const setEstablishment = (state: any, action: { establishment: any }) => {
    return Immutable.setIn(state, ['establishment'], action.establishment);
}

export const setToken = (state: any, action: { token: string }) => {
    return Immutable.setIn(state, ['token'], action.token);
}

export const setLoading = (state: any, action: { loading: boolean }) => {
    return Immutable.setIn(state, ['action', 'loading'], action.loading);
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_USER_PROFILE_REQUEST]: getUserProfileRequest,
    [Types.GET_USER_PROFILE_FAILURE]: getUserProfileFailure,
    [Types.GET_USER_PROFILE_SUCCESS]: getUserProfileSuccess,

    [Types.UPDATE_PROFILE_REQUEST]: updateProfileRequest,
    [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
    [Types.UPDATE_PROFILE_FAILURE]: updateProfileFailure,


    [Types.SET_ESTABLISHMENT]: setEstablishment,
    [Types.SET_TOKEN]: setToken,
    [Types.SET_LOADING]: setLoading,
})
