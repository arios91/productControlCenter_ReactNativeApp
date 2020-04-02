import {GET_DRIVERS, SET_DRIVER, CLEAR_SET_DRIVER, SET_LOADING} from '../actions/constants'

const initialState = {
    loading: false
}

export default function(state = initialState, action){
    // console.log('HELLO FROM REDUCER');
    console.log(action);
    console.log(payload);
    const {type, payload} = action;

    switch(type){
        case SET_LOADING:
            return{
                loading: payload
            }
        default:
            return state
    }
}