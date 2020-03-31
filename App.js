import React from 'react'
import {View, Text, StyleSheet} from 'react-native';
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Tasks from './components/Tasks'

import {Provider} from 'react-redux';
import store from './store'

const App = props => {


  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Header title='Petalos y Arte'/>
        <Dashboard/>
        <Tasks/>

      </View>
    </Provider>
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
