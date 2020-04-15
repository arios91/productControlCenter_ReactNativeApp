import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {markOrderAsDelivered} from '../actions/order'
import {View, Text, StyleSheet, Button, Linking, TouchableHighlight} from 'react-native';
import { showLocation } from 'react-native-map-link'
import Loading from './Loading';

const OrderItem = ({employee, order, navigation}) => {
    console.log('------------------------');
    console.log('in order');
    const {currentOrder} = order;
    const {driver} = employee;

    const masterLoad = employee.loading && order.loading;

    const callPhone = () => {
        console.log('calling');
        Linking.openURL(`tel:${currentOrder.deliveryPhone}`);
    }

    const markDelivered = () => {
        console.log('delivered');
        markOrderAsDelivered(currentOrder);
        navigation.navigate('Dashboard');
    }

    const openNavigation = () => {
        showLocation({
            latitude: 0,
            longitude: 0,
            title: currentOrder.deliveryAddress,  // optional
            googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
            googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58',  // optionally specify the google-place-id
            alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
            dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
            dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
            cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
            appsWhiteList: ['google-maps'] // optionally you can set which apps to show (default: will show all supported apps installed on device)
            // appTitles: { 'google-maps': 'My custom Google Maps title' } // optionally you can override default app titles
            // app: 'uber'  // optionally specify specific app to use
        })
    }

    return (
        <View>
            {masterLoad ? <Loading override={true}/>:
            <View>
                <Text>{currentOrder.recipient}</Text>
                <TouchableHighlight onPress={callPhone}>
                    <Text>{currentOrder.deliveryPhone}</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={openNavigation}>
                    <Text>{currentOrder.deliveryAddress}</Text>
                </TouchableHighlight>
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
