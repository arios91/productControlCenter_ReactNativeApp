import 'react-native-gesture-handler';
import React from 'react'
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, StyleSheet} from 'react-native';
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Tasks from './components/Tasks'
import {Provider} from 'react-redux';
import store from './store'
import Profile from './components/Profile';
import Splash from './components/Splash';
import DriverSelect from './components/DriverSelect';
import Loading from './components/Loading';


const App = props => {
  
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <Loading/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" headerMode="none">
          <Stack.Screen name="Splash" component={Splash} options={{title: 'Petalos y Arte'}}/>
          <Stack.Screen name="DriverSelect" component={DriverSelect} options={{title: 'Driver Select'}}/>
          <Stack.Screen name="Dashboard" component={Dashboard} options={{title: 'Dashboard'}}/>
          <Stack.Screen name="Tasks" component={Tasks} options={{title: 'Tasks'}}/>
          <Stack.Screen name="Profile" component={Profile} options={{title: 'Profile'}}/>
        </Stack.Navigator>
        <Tasks/>
      </NavigationContainer>
    </Provider>
        // <View style={styles.container}>
        //   <Header title='Petalos y Arte'/>
        //   <Dashboard/>
        //   <Tasks/>

        // </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  toDo:{
    fontWeight: 'bold',
    fontSize: 25
  },
  taskComplete:{
    textDecorationLine: 'line-through'
  }
})

export default App;
