import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const Loading = ({alert:{loading}, tmpValue}) => {
    return (
        <View>
            <Spinner visible={loading} textContent={'Loading...'}/>
        </View>
    )
}

Loading.protoTypes = {
    alert: PropTypes.object.isRequired,
    tmpValue: PropTypes.bool.isRequired,
}
  

const mapStateToProps = state => ({
    alert: state.alert
})

export default connect(mapStateToProps, null)(Loading)
