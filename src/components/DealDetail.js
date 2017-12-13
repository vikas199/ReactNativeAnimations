import React, { Component } from 'react';
import Proptypes from 'prop-types';
import api from '../Api';
import { View, Text, Image, ScrollView, TouchableOpacity, PanResponder, Animated, Dimensions, Button, Linking } from 'react-native';
import { priceDisplay } from '../utils';

export default class DealDetail extends Component{
    imageXPos = new Animated.Value(0)
    imagePanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gs) => {
        this.imageXPos.setValue(gs.dx);
        },
        onPanResponderRelease: (evt, gs) => {
            const width = Dimensions.get('window').width;
            if (Math.abs(gs.dx) >  width * 0.4) {
                const direction = Math.sign(gs.dx);
                //swipe left
                Animated.timing(this.imageXPos, {
                    toValue: direction * width,
                    duration: 250,
                }).start(() => this.handleSwipe(-1 * direction));
            }else {
                Animated.spring(this.imageXPos, {
                    toValue: 0,
                }).start();
            }
        }
    });
    handleSwipe = (indexDirection) => {
        if(!this.state.deal.media[this.state.imageIndex + indexDirection]){
            Animated.spring(this.imageXPos, {
                toValue: 0,
            }).start();
            return;
}
        this.setState((prevState) => ({
            imageIndex: prevState.imageIndex + indexDirection
        }), () => {
            this.imageXPos.setValue(indexDirection * this.width);
            Animated.spring(this.imageXPos, {
                toValue: 0,
            }).start();
        })
    }


    static propTypes = {
        initialDeal: Proptypes.object.isRequired,
        onBack: Proptypes.func.isRequired
    }

    state={
        deal:this.props.initialDeal,
        imageIndex: 0
    }
    async componentDidMount(){
        const dealDetail= await api.fetchDealDetail(this.state.deal.key)
        this.setState({ deal: dealDetail})
    }
    openUrl = () => {
        Linking.openURL(this.state.deal.url);
    }

    render(){
        const { deal } = this.state;
        return(
            <View style={styles.container}>
           <View style={styles.deal}>
               <TouchableOpacity onPress={this.props.onBack} style={styles.back}>
                   <Text>Back</Text>
               </TouchableOpacity>
                <Animated.Image
                    {...this.imagePanResponder.panHandlers}
                    style={[{left: this.imageXPos}, styles.image]}
                    source={{ uri: deal.media[this.state.imageIndex] }} />
           </View>

            <View style={styles.info}>
                    <Text style={styles.title}>{deal.title}</Text>
            </View>
                <ScrollView>
                <View style={styles.content}>
                <View>
                    <Text style={styles.cause}>{deal.cause.name}</Text>
                    <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                </View>
                 {deal.user &&
                <View style={styles.user}>
                    <Image source={{ uri: deal.user.avatar }} style={styles.imageStyles}/>
                    <Text style={styles.username}>{deal.user.name}</Text>
                </View>
                }
                </View>
                <View style={styles.descp}>
                    <Text>{deal.description}</Text>
                </View>
                <Button title="Buy"  onPress={this.openUrl}/>
                </ScrollView>
            </View>

        )
    }
}

const styles = {
    container:{
      flex: 1,
        margin: 8,
        marginTop: 40
    },
    deal:{
        //margin:10,
        //borderWidth:1
    },
    content:{
        flexDirection:'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    back:{
      margin: 5
    },
    info:{
        padding:10,
        backgroundColor: '#ffc966',
        borderColor: '#bbb',
        borderTopWidth:0
    },
    image:{
        width: '100%',
        height: 120,
        backgroundColor:'#ccc'
    },
    username: {
        fontWeight: 'bold',
        fontSize: 12,

    },
    title:{
        margin:5,
        fontSize:16,
        textAlign: 'center',
        fontWeight:'bold',
        fontFamily: 'Cochin'
    },
    price:{
        fontWeight: 'bold',
        fontSize:16,
    },
    cause:{
        //flex:2,
        fontWeight:'bold',
        fontSize:16
    },
    imageStyles: {
        width: 60,
        height: 60,
        backgroundColor:'#ccc'
    },
    descp:{
      marginTop: 10
    },
    user:{
        //flex: 0.2,
        alignSelf: 'flex-end',

    }
}