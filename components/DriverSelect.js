import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {setDriver, clearSetDriver} from '../actions/employee';
import {setLoading} from '../actions/alert';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Picker} from '@react-native-community/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const DriverSelect = ({employee:{driver, loading, drivers}, navigation}) => {
    const [selectedDriver, setSelectedDriver] = useState(null)


    const handleDriverChange = (tmpDriver) => {
        setLoading(true);
        if(tmpDriver !== null){
            setDriver(tmpDriver);
        }else{
            clearSetDriver();
        }
        setTimeout(() => {
            setSelectedDriver(tmpDriver);
            setLoading(false);
        }, 1000)
    }

    return (
        <View>
            {loading ? <Text>Loading Drivers</Text>:
            <View>
                <Text>Select Drivers</Text>
                <Picker 
                    selectedValue={selectedDriver}
                    onValueChange={(itemValue) => handleDriverChange(itemValue)}>
                    <Picker.Item label="-- Select Driver --" value={null}/>
                    {drivers.map(driver => <Picker.Item key={driver._id} label={driver.name} value={driver}/>)}
                </Picker>
                <Button title="Continue" onPress={() => navigation.navigate('Dashboard')} disabled={selectedDriver === null}/>
            </View>
            }
        </View>
    )
}

DriverSelect.propTypes = {
    employee: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    setDriver: PropTypes.func.isRequired,
    clearSetDriver: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    employee: state.employee
})

export default connect(mapStateToProps, {setDriver, clearSetDriver, setLoading})(DriverSelect)
