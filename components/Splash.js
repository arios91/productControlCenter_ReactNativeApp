import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getOrders} from '../actions/order'
import {getDrivers} from '../actions/employee';
import {View, Text, StyleSheet, Button} from 'react-native';

const Dashboard = ({employee:{loading, drivers}, navigation}) => {
    useEffect(() => {
        getDrivers();
    }, [getOrders, getDrivers])

    if(!loading){
        setTimeout(() => {
            navigation.navigate('DriverSelect')
        }, 1000);
    }

    return (
        <View>
            {loading ? <Text>Loading Splash</Text>:
            <Text>Splash Screen</Text>}
        </View>
    )
}

Dashboard.propTypes = {
    getDrivers: PropTypes.func.isRequired,
    employee: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    order: state.order,
    employee: state.employee
})

export default connect(mapStateToProps, {getDrivers})(Dashboard)
