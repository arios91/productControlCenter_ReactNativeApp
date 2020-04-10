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

const OrderItem = ({order}) => {
    console.log('------------------------');
    console.log('in order');
    return (
        <View>
            <Text>{order.description}</Text>
        </View>
    )
}

OrderItem.propTypes = {
    order: PropTypes.object.isRequired,
}

export default OrderItem
