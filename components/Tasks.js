import React from 'react'
import {View, Text, StyleSheet} from 'react-native';

const Tasks = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.toDo}>To-Do</Text>
        <Text style={styles.taskComplete}>Get Drivers</Text>
        <Text>Choose a driver</Text>
        <Text>Retrieve orders for driver</Text>
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
  

export default Tasks
