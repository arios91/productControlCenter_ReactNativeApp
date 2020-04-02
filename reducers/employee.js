import {GET_DRIVERS, SET_DRIVER, CLEAR_SET_DRIVER} from '../actions/constants'

const initialState = {
    driver: null,
    drivers: [],
    error: {},
    loading: true
}

export default function(state = initialState, action){
    // console.log('HELLO FROM REDUCER');
    console.log(action);
    console.log(payload);
    const {type, payload} = action;

    switch(type){
        case GET_DRIVERS:
            return{
                ...state,
                drivers: payload,
                loading: false
            }
        case SET_DRIVER:
            return{
                ...state,
                driver: payload,
                loading: false
            }
        case CLEAR_SET_DRIVER:
            return{
                ...state,
                driver: null,
                loading: false
            }
        default:
            return state
    }
}