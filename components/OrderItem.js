import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {markOrderAsDelivered} from '../actions/order'
import {View, Text, StyleSheet, Linking, TouchableHighlight} from 'react-native';
import { showLocation } from 'react-native-map-link'
import Button from 'react-native-button';
import Loading from './Loading';
import { white } from 'color-name';

const OrderItem = ({employee, order, navigation}) => {
    console.log('------------------------');
    console.log('in order');
    const {currentOrder} = order;
    const {driver} = employee;

    const masterLoad = employee.loading && order.loading;

    const addressArr = currentOrder.deliveryAddress.split(',');
    addressArr.pop();

    const callPhone = () => {
        Linking.openURL(`tel:${currentOrder.deliveryPhone}`);
    }
    const callCustomerPhone = () => {
        Linking.openURL(`tel:${currentOrder.customerPhone}`);
    }

    const markDelivered = () => {
        console.log('delivered');
        // markOrderAsDelivered(currentOrder);
        // navigation.navigate('Dashboard');
    }


    const testPress = () => {
        console.log('test press');
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

    return masterLoad ? <View style={styles.container}><Loading override={true}/></View>:(
        <View style={styles.container}>
            <View style={styles.outerContainer}>
                <View>
                    <View style={styles.subSection}>
                        <Text style={styles.text, styles.customerName}>{currentOrder.recipient}</Text>
                        <Text style={styles.text} onPress={callPhone}>{currentOrder.deliveryPhone}</Text>
                        <Text style={styles.text} onPress={openNavigation}>{addressArr.toString()}</Text>
                    </View>

                    <View style={styles.subSection}>
                        <Text style={styles.subHeader}>Description</Text>
                        <Text style={styles.text}>{currentOrder.description}</Text>
                    </View>

                    {currentOrder.specialInstructions ? 
                        <View style={styles.subSection}>
                            <Text style={styles.subHeader}>Special Instructions</Text>
                            <Text style={styles.text}>{currentOrder.specialInstructions}</Text>
                        </View>
                    : null}

                    <View>
                        <Text style={styles.subHeader}>Customer</Text>
                        <Text style={styles.text} onPress={callCustomerPhone}>{currentOrder.customer} - {currentOrder.customerPhone}</Text>
                    </View>
                </View>
                <View>
                    <Button 
                        style={styles.confirmButton}
                        onPress={markDelivered}>
                        Confirm Delivery
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#000',
        padding: 20
    },
    outerContainer:{
        flex: 1,
        backgroundColor: '#252525',
        justifyContent: 'space-between',
        borderRadius: 16,
        padding: 20
    },
    innerContainer:{
        flex: 1,
    },
    subSection:{
        marginBottom: 20
    },
    text:{
        color: 'white',
        fontSize: 15,
        marginBottom: 5,
        alignSelf: 'center'
    },
    customerName:{
        color: 'white',
        fontSize: 40,
        textDecorationLine: 'underline',
        alignSelf: 'center'
    },
    subHeader:{
        color: 'white',
        fontSize: 25,
        alignSelf: 'center',
        textDecorationLine: 'underline',
    },
    confirmButton:{
        padding:10, 
        height:45, 
        overflow:'hidden', 
        borderRadius:16, 
        width: '100%', 
        alignSelf: 'center',
        backgroundColor: '#007bff',
        color: 'white'
    }
})

OrderItem.propTypes = {
    navigation: PropTypes.object.isRequired,
    markOrderAsDelivered: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    order: state.order,
    employee: state.employee
})
export default connect(mapStateToProps, {markOrderAsDelivered})(OrderItem)
