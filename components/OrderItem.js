import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {markOrderAsDelivered} from '../actions/order'
import {View, Text, StyleSheet, Button} from 'react-native';
import Loading from './Loading';

const OrderItem = ({employee, order, navigation}) => {
    console.log('------------------------');
    console.log('in order');
    const {currentOrder} = order;
    const {driver} = employee;

    const masterLoad = employee.loading && order.loading;

    const markDelivered = () => {
        console.log('delivered');
        markOrderAsDelivered(currentOrder);
        navigation.navigate('Dashboard');
    }
    return (
        <View>
            {masterLoad ? <Loading override={true}/>:
            <View>
                <Text>{currentOrder.recipient}</Text>
                <Text>{currentOrder.description}</Text>
                <Button onPress={markDelivered} title='Confirm Delivery'/>
            </View>
            }
        </View>
    )
}

OrderItem.propTypes = {
    navigation: PropTypes.object.isRequired,
    markOrderAsDelivered: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    order: state.order,
    employee: state.employee
})
export default connect(mapStateToProps, {markOrderAsDelivered})(OrderItem)
