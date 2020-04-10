import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getOrdersForDriver, getOrders} from '../actions/order'
import {getDrivers} from '../actions/employee';
import {View, Text, StyleSheet, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {setLoading} from '../actions/alert';
import { useFocusEffect } from '@react-navigation/core';
import OrderItem from './OrderItem'

const Dashboard = ({employee, navigation, order}) => {
    const {driver} = employee;
    const {orders} = order;
    console.log('------------------------');
    console.log('in dashboard');
    console.log(driver.name);
    useEffect(() => {
        getOrdersForDriver(driver)
    }, [getOrdersForDriver]);

    const masterLoad = employee.loading && order.loading;

    return (
        <View>
            {masterLoad ? <Text>Loading Dashboard</Text> :
            <View>
                <Text>{driver.name}: {orders.length}</Text>
                {orders.map(order => <OrderItem key={order._id} order={order}/>)}
            </View>
            }
        </View>
    )
}

Dashboard.propTypes = {
    navigation: PropTypes.object.isRequired,
    getOrdersForDriver: PropTypes.func.isRequired,
    // setLoading: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    order: state.order,
    employee: state.employee
})

export default connect(mapStateToProps, {getOrdersForDriver, getOrders})(Dashboard)
