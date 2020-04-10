import axios from 'axios';
import store from '../store'
import {API_URL , GET_ORDERS, CREATE_ORDER, UPDATE_ORDER, ORDER_ERROR} from './constants'

export const getOrders = () =>{
    console.log('getting all orders');
    try {
        const t1 = axios.get(`${API_URL}/orders`);

        // store.dispatch({
        //     type: GET_ORDERS,
        //     payload: t1.data
        // })
        
    } catch (error) {
        console.error(error);
    }

}

export const getOrdersForDriver = async (driver) => {
    try {
        console.log('Getting order for driver');
        console.log(driver);
        const orders = await axios.get(`${API_URL}/orders/${driver._id}`);
        store.dispatch({
            type: GET_ORDERS,
            payload: orders.data
        });
    } catch (error) {
        console.error(error)
    }
}

// export const createOrder = (formData, edit = false) => async dispatch => {
//     try {
//         const config = {
//             headers:{'Content-type': 'application/json'}
//         };
//         console.log(formData);

//         const res = await axios.post(`${API_URL}/orders`, formData, config);
//         console.log(res.data);
//         if(!edit){
//             dispatch({
//                 type: CREATE_ORDER,
//                 payload: res.data
//             })
//         }else{
//             dispatch({
//                 type: UPDATE_ORDER,
//                 payload: res.data
//             })
//             return 'hello world';
//         }

//         dispatch(setAlert('Success', 'primary'));

//     } catch (error) {
//         const errors = error.response.data.errors;
//         if(errors){
//             errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
//         }
//         dispatch({
//             type: ORDER_ERROR,
//             payload: {msg: error.response.statusText, status: error.response.status}
//         })
//     }
// }
