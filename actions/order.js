import axios from 'axios';
import store from '../store'
import {API_URL , GET_ORDERS, CREATE_ORDER, UPDATE_ORDER, ORDER_ERROR, SET_ORDER, CLEAR_ORDERS, ORDER_DELIVERED} from './constants'

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
        const data = orders.data;
        data.sort((a,b) => (a.distanceFromShop >= b.distanceFromShop) ? 1 : -1 );

        //sort orders 

        store.dispatch({
            type: GET_ORDERS,
            payload: data
        });
    } catch (error) {
        console.error(error)
    }
}

export const setCurrentOrder = order => {
    try {
        store.dispatch({
            type: SET_ORDER,
            payload: order
        });
    } catch (error) {
        console.error(error);
    }
}

export const clearOrders = () => {

    try {
        store.dispatch({type:CLEAR_ORDERS});
    } catch (error) {
        console.error(error);
    }
}

export const markOrderAsDelivered = async order => {
    try {
        console.log('in update order');
        console.log(order);
        const config = {
            headers:{'Content-type': 'application/json'}
        };
        if(order.bloomOrder){
            order.status = 'needsConfirmation';
        }else{
            order.status = 'delivered';
        }
        const res = await axios.post(`${API_URL}/orders`, order, config);
        store.dispatch({
            type: ORDER_DELIVERED,
            payload: order._id
        });
    } catch (error) {
        console.error(error);
    }
}
