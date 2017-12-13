import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, Easing } from 'react-native';
import api from '../Api';
import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

export default class App extends Component {
    titleXPos = new Animated.Value(0);
    state = {
        deals: [],
        currentDealId: null,
        dealsFromSearch: []
    };
    animateTitle = ( direction = 1 ) => {
        const width = Dimensions.get('window').width - 150;
        Animated.timing(this.titleXPos, {
            toValue: direction * (width / 2),
            duration: 1000,
            easing: Easing.ease
        }).start(({ finished }) => {
            if (finished) {
                this.animateTitle(-1 * direction);
            }
        });
    }
    async componentDidMount() {
        this.animateTitle();
        const deals = await api.fetchInitialDeal();
        //console.log('deals:::', deals)
        this.setState({ deals });
    }

    setCurrentDeal = (dealId) => {
        this.setState({ currentDealId: dealId });
    }
    
    unsetCurrentDeal = () => {
        this.setState({ currentDealId: null })
    }
    searchDeals = async (searchTerm) => {
        let dealsFromSearch = [];
        if (searchTerm) {
            dealsFromSearch = await api.searchDeal(searchTerm);
            //console.log(dealsFromSearch);
        }

        this.setState({ dealsFromSearch });
    }
    currentDeal = () => {
        return this.state.deals.find(
            (deal) => deal.key === this.state.currentDealId
        );
    }

    render() {
        if (this.state.currentDealId) {
            return <DealDetail initialDeal={this.currentDeal()} onBack={this.unsetCurrentDeal} />
        }
        const dealsToDisplay = this.state.dealsFromSearch.length > 0 ?
            this.state.dealsFromSearch :
            this.state.deals;
        if (dealsToDisplay.length > 0) {
            return (
            <View style={styles.main}>
                <SearchBar searchDeals={this.searchDeals} />
                <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
            </View>
            )}
        return (
            <Animated.View style={[{ left: this.titleXPos }, styles.container]}>
                <Text style={styles.welcome}>Deals..</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    main: {
       marginTop:30
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
