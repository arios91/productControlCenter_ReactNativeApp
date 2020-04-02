import React, {useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native';

const Profile = ({navigation}) => {
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('IN PROFILE');
            navigation.navigate('DriverSelect');
        })
    }, [])
    return (
    <View style={styles.container}>
        <Text>Hello From Profile</Text>
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
  

export default Profile
