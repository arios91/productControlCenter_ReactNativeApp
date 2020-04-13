import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getOrders} from '../actions/order'
import {getDrivers} from '../actions/employee';
import {View, Text, StyleSheet, Button} from 'react-native';
import { setLoading } from '../actions/alert';
import { useFocusEffect } from '@react-navigation/core';
import Loading from './Loading'
const Splash = ({employee:{loading, drivers}, navigation}) => {
    console.log('------------------------');
    console.log('in splash screen');

    useEffect(() => {
        getDrivers();
    }, [getDrivers])

    if(!loading){
        navigation.replace('DriverSelect');
    }


    return (
        <View>
            {loading ? <Loading override={true}/>:
            <Text>Splash Screen</Text>}
        </View>
    )
}

Splash.propTypes = {
    getDrivers: PropTypes.func.isRequired,
    employee: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    order: state.order,
    employee: state.employee
})

export default connect(mapStateToProps, {getDrivers})(Splash)
