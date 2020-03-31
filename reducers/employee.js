import {GET_DRIVERS} from '../actions/constants'

const initialState = {
    drivers: [],
    error: {},
    loading: true
}

export default function(state = initialState, action){
    // console.log('HELLO FROM REDUCER');
    // console.log(action);
    const {type, payload} = action;

    switch(type){
        case GET_DRIVERS:
            return{
                ...state,
                drivers: payload,
                loading: false
            }
        default:
            return state
    }
}