import * as actions from './actionTypes';

export const cityChanged = city => ({
    type: actions.CITY_CHANGED,
    payload: city
})