import axios from 'axios';
import store from '../store'
import {API_URL , GET_DRIVERS, SET_DRIVER, CLEAR_SET_DRIVER} from './constants'


export const getDrivers = async () => {
    console.log('Getting Drivers');
    try {
        const res = await axios.get(`${API_URL}/employees/driver`);

        store.dispatch({
            type: GET_DRIVERS,
            payload: res.data
        })
        
    } catch (error) {
        console.error(error);
    }

}

export const setDriver = (driver) => {
    console.log('setting driver');
    console.log(driver);
    try {
        store.dispatch({
            type: SET_DRIVER,
            payload: driver
        })
        console.log('done setting driver');
    } catch (error) {
        console.error(error);
    }
}

export const clearSetDriver = () => {
    console.log('clearing driver');
    try {
        store.dispatch({
            type: CLEAR_SET_DRIVER,
            payload: null
        })
    } catch (error) {
        console.error(error);
    }
}