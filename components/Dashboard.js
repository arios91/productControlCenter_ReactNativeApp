import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getOrders} from '../actions/order'
import {getDrivers} from '../actions/employee';
import {View, Text, StyleSheet, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Dashboard = ({employee:{driver, drivers, loading}, navigation}) => {
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('IN DASHBOARD');
            // if(driver !== null){
            //     console.log('DRIVER ALREADY IN STATE');
            //     console.log(driver);
            //     // getDrivers();
            // }
        })
    }, [])

    return (
        <View>
            <Text>-----------------------------------------</Text>
            <Text>{driver.name}</Text>
            {/* {employee.loading ? <Text>Loading employee</Text>:
            <Text>{employee.driver.name}</Text>} */}
            {/* {loading ? <Text>Loading</Text> 
            :orders.map(order => <Text key={order._id}>{order.description}</Text>)}
            <Text>-----------------------------------------</Text>
            {employee.loading ? <Text>Loading Drivers</Text> 
            :employee.drivers.map(driver => <Text key={driver._id}>{driver.name}</Text>)}
            <Text>-----------------------------------------</Text> */}

        </View>
    )
}

Dashboard.propTypes = {
    navigation: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    order: state.order,
    employee: state.employee
})

export default connect(mapStateToProps, {})(Dashboard)
