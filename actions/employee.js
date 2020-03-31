import axios from 'axios';
import store from '../store'
import {API_URL , GET_DRIVERS} from './constants'


export const getDrivers = async () =>{
    try {
        const res = await axios.get(`${API_URL}/employees/driver`);
        console.log('drivers');
        console.log(res.data);

        store.dispatch({
            type: GET_DRIVERS,
            payload: res.data
        })
        
    } catch (error) {
        console.error(error);
    }

}