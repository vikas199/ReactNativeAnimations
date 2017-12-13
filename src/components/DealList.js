import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, FlatList } from 'react-native';
import DealItem from './DealItem';

const deviceWidth = Dimensions.get('window').width;


export default class DealList extends Component {
    static propTypes = {
        deals: PropTypes.array.isRequired,
        onItemPress: PropTypes.func.isRequired
    }
    render() {
        return (
            <View style = {styles.container}>
                <FlatList
                    data={this.props.deals}
                    renderItem={({ item }) => <DealItem deal={item} onSelected={this.props.onItemPress} /> }
                        />
             </View>
        );
    }
}


const styles = {
    container:{

        width: deviceWidth,
        backgroundColor: '#eee',

    }
}