import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, StyleSheet, } from 'react-native';
import {connect} from 'react-redux';

const Tasks = ({order:{loading, orders}}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.toDo}>To-Do</Text>
            <Text style={styles.taskComplete}>Get Drivers</Text>
            <Text style={styles.taskComplete}>Learn Navigation</Text>
            <Text style={styles.taskComplete}>Splash Screen</Text>
            <Text style={styles.taskComplete}>Present driver list select on start</Text>
            <Text style={styles.taskComplete}>Choose a driver</Text>
            <Text style={styles.taskComplete}>Retrieve orders for driver</Text>
            <Text style={styles.taskComplete}>Update Order as delivered</Text>
            <Text style={styles.taskComplete}>Show a no orders assigned in middle in Dash if no orders</Text>
            <Text>Complete Order Details screen</Text>
            <Text>Link address to Google Maps</Text>
            <Text>Save driver to phone</Text>
            <Text>keep logged in url</Text>
            <Text>https://reactnative.dev/docs/asyncstorage.html</Text>
            <Text>Implement listener in web client</Text>
            <Text>https://pusher.com/tutorials/mongodb-change-streams</Text>
            <Text style={styles.toDo}>Visual</Text>
            <Text>Animation loading screen on start</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    toDo:{
        fontWeight: 'bold',
        fontSize: 25
    },
    taskComplete:{
        textDecorationLine: 'line-through'
    }
})

Tasks.protoTypes = {
    order: PropTypes.object.isRequired
}
  

const mapStateToProps = state => ({
    order: state.order
})
export default connect(mapStateToProps, null)(Tasks)
