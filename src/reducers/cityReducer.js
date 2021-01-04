import * as actions from '../actions/actionTypes';

export default function reducer(state = {city: "New York"}, action){
    switch (action.type){
        case actions.CITY_CHANGED: 
            return { ...state, city: action.payload };
        default:
            return state;
    }
}