import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {testFunction} from '../actions/order'
import {getDrivers} from '../actions/employee';
import {View, Text, StyleSheet} from 'react-native';

const Dashboard = ({order:{loading, orders}, employee}) => {
    useEffect(() => {
        testFunction();
        getDrivers();
    }, [testFunction, getDrivers])

    return (
        <View>
            <Text>-----------------------------------------</Text>
            {loading ? <Text>Loading</Text> 
            :orders.map(order => <Text key={order._id}>{order.description}</Text>)}
            <Text>-----------------------------------------</Text>
            {employee.loading ? <Text>Loading Drivers</Text> 
            :employee.drivers.map(driver => <Text key={driver._id}>{driver.name}</Text>)}
            <Text>-----------------------------------------</Text>
        </View>
    )
}

Dashboard.propTypes = {
    testFunction: PropTypes.func.isRequired,
    getDrivers: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    employee: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    order: state.order,
    employee: state.employee
})

export default connect(mapStateToProps, {testFunction, getDrivers})(Dashboard)
