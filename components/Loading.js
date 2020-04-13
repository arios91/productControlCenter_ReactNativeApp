import React from 'react'
import PropTypes from 'prop-types'
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const Loading = ({alert:{loading}, override}) => {
    return (
        <View>
            <Spinner visible={loading || override} textContent={'Loading...'}/>
        </View>
    )
}

Loading.protoTypes = {
    alert: PropTypes.object.isRequired,
    override: PropTypes.bool
}

Loading.defaultProps = {
    override: false
}

const mapStateToProps = state => ({
    alert: state.alert
})

export default connect(mapStateToProps, null)(Loading)
