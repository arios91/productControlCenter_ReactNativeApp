import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {setDriver, clearSetDriver} from '../actions/employee';
import {setLoading} from '../actions/alert';
import {View, Text, StyleSheet, RefreshControl, ScrollView, SafeAreaView, TouchableHighlight} from 'react-native';
import Button from 'react-native-button';
import {Picker} from '@react-native-community/picker';
import {getDrivers} from '../actions/employee';
import Loading from './Loading'

function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

const DriverSelect = ({employee:{loading, drivers}, navigation}) => {
    console.log('------------------------');
    console.log('In driver select');
    
    const [selectedDriver, setSelectedDriver] = useState(null)
    const [refreshing, setRefreshing] = useState(false)

    const handleDriverChange = async (tmpDriver) => {
        setSelectedDriver(tmpDriver);
    }
    
    const selectDriver = () => {
        if(selectedDriver !== null){
            setDriver(selectedDriver);
            navigation.navigate('Dashboard');
        }else{
            clearSetDriver();
        }
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(1000).then(() => {
            getDrivers();
            setRefreshing(false);
        });
    }, [refreshing]);



    return (
        <SafeAreaView style={styles.container1}>
            {loading ? <Loading override={true}/>:
            <ScrollView 
                contentContainerStyle={styles.container2}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <Picker
                        style={styles.picker}
                        selectedValue={selectedDriver}
                        itemStyle={{fontSize: 40, height: 100}}
                        onValueChange={(itemValue) => {handleDriverChange(itemValue)}}>
                        <Picker.Item label="-- Select Driver --" value={null} style={{fontSize: 40}}/>
                        {drivers.map(driver => <Picker.Item key={driver._id} label={driver.name} value={driver}/>)}
                    </Picker>
                    <Button
                        style={styles.activeButton}
                        styleDisabled={styles.disabledButton}
                        disabled={selectedDriver === null}
                        onPress={() => selectDriver()}>
                        Continue
                    </Button>
                    <Text></Text>
                    <Text></Text>


            </ScrollView>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container1:{
        flex: 1,
        backgroundColor: 'powderblue'
    },
    container2:{
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: 'black',
    },
    picker:{
        width: '65%',
        alignSelf: 'flex-end',
        color: 'white',
        fontSize: 20,
        paddingBottom: 10
    },
    activeButton:{
        padding:10, 
        height:45, 
        overflow:'hidden', 
        borderRadius:16, 
        width: '66%', 
        alignSelf: 'center',
        backgroundColor: '#007bff',
        color: 'white'
    },
    disabledButton:{
        padding:10, 
        height:45, 
        overflow:'hidden', 
        borderRadius:16, 
        width: '66%', 
        alignSelf: 'center',
        backgroundColor: '#505050'
    }
})
DriverSelect.propTypes = {
    employee: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    setDriver: PropTypes.func.isRequired,
    clearSetDriver: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    getDrivers: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    employee: state.employee
})

export default connect(mapStateToProps, {setDriver, getDrivers, clearSetDriver, setLoading})(DriverSelect)
