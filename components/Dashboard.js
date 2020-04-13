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
            <Text>{order.orderNum}</Text>
            <Text>{order.recipient}</Text>
            <Text>{order.deliveryAddress}</Text>
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
        setLoading(true);

        wait(1000).then(() => {
            getOrdersForDriver(driver);
            setRefreshing(false);
            setLoading(false);
        });
    }, [refreshing]);

    return (
        <SafeAreaView style={{flex: 1}}>
            {masterLoad ? <Loading override={true}/>:
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <View>
                    <Text>{driver.name}: {orders.length}</Text>
                    <FlatList
                        data={orders}
                        renderItem={({ item }) => <Item key={item._id} order={item} navigation={navigation} />}
                        keyExtractor={item => item._id}
                    />
                </View>
            </ScrollView>
        }
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16
    },
    item: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
      },
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
