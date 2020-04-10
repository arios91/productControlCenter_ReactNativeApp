import axios from 'axios';
import store from '../store'
import {SET_LOADING} from './constants'


export const setLoading = (value) => {
    console.log(`Loading: ${value}`);
    try {
        store.dispatch({
            type: SET_LOADING,
            payload: value
        })
    } catch (error) {
        console.error(error);
    }
}