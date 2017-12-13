import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { priceDisplay } from '../utils';

export default class DealItem extends Component{
    static propTypes = {
        deal: Proptypes.object.isRequired,
        onSelected: Proptypes.func.isRequired
    }

    handlePress = () => {
        this.props.onSelected(this.props.deal.key);
    }
    render(){
        const { deal } = this.props;
        return(
            <TouchableOpacity onPress={this.handlePress}
                              style={styles.deal}>
                <Image
                    style={styles.image}
                    source={{ uri: deal.media[0] }} />
                <View style={styles.info}>
                    <Text style={styles.title}>{deal.title}</Text>

                    <View style={styles.footer}>
                    <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                    <Text style={styles.cause}>{deal.cause.name}</Text>
                </View>
                </View>
            </TouchableOpacity>

        )
    }
}

const styles = {
    deal:{
      margin:5
    },
    info:{
       padding:5,
        borderWidth:1,
        backgroundColor: '#fff',
        borderColor: '#bbb',
        borderTopWidth:0
    },
    image:{
        width: '100%',
        height: 100,
        backgroundColor:'#ccc'
    },
    title:{
        margin:5,
        fontSize:16,
        fontWeight:'bold',
        fontFamily: 'Cochin'
    },
    price:{
        //flex:1,
       textAlign: 'right'
    },
    cause:{
     //flex:2,
        fontWeight:'bold'
    },
    footer:{
        flex:1,
        justifyContent:'space-around'
    }
}