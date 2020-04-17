import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {View, Text, StyleSheet, FlatList, RefreshControl, ScrollView, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from './Loading';
import {getOrdersForDriver, getOrders, setCurrentOrder, clearOrders} from '../actions/order'
import {setLoading} from '../actions/alert';

function Item({ order, navigation }) {
    const onPress = () => {
        setCurrentOrder(order);
        navigation.navigate('OrderItem');
    }
    return (
      <View style={styles.item}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.itemDetails}>{order.orderNum}</Text>
            <Text style={styles.itemDetails}>{order.recipient}</Text>
            <Text style={styles.itemDetails}>{order.deliveryAddress}</Text>
          </TouchableOpacity>
      </View>
    );
  }

  function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

const Dashboard = ({employee, navigation, order}) => {
    const {driver} = employee;
    const {orders} = order;
    console.log('------------------------');
    console.log('in dashboard');

    useEffect(() => {
        getOrdersForDriver(driver)
    }, [getOrdersForDriver]);

    const [refreshing, setRefreshing] = useState(false)
    const masterLoad = employee.loading && order.loading;


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(1000).then(() => {
            getOrdersForDriver(driver);
            setRefreshing(false);
        });
    }, [refreshing]);

    return (
        <SafeAreaView style={styles.container}>
            {masterLoad ? <Loading override={true}/>:
            <ScrollView
              contentContainerStyle={styles.scrollViewContainer}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {orders.length > 0 ? 
                <View>
                    <Text>{driver.name}: {orders.length}</Text>
                    <FlatList
                        data={orders}
                        renderItem={({ item }) => <Item key={item._id} order={item} navigation={navigation} />}
                        keyExtractor={item => item._id}
                    />
                </View>
                :
                <View style={styles.noItemsContainer}>
                  <Text style={styles.noItems}>No orders assigned</Text>
                </View>
                }
            </ScrollView>
        }
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewContainer:{
      flex: 1,
      backgroundColor: 'black',
    },
    noItemsContainer:{
      flex: 1,
      justifyContent: 'center'
    },
    noItems:{
      color: '#fff',
      alignSelf: 'center',
      fontSize: 30
    },
    item: {
      backgroundColor: "#252525",
      width: '90%',
      alignSelf: 'center',
      padding: 10,
      overflow: 'hidden',
      borderRadius: 16,
      marginVertical: 10

    },
    itemDetails:{
      color: 'white',
      fontSize: 17
    }
  });
  

Dashboard.propTypes = {
    navigation: PropTypes.object.isRequired,
    getOrdersForDriver: PropTypes.func.isRequired,
    clearOrders: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    order: state.order,
    employee: state.employee
})

export default connect(mapStateToProps, {getOrdersForDriver, getOrders, clearOrders, setLoading})(Dashboard)
