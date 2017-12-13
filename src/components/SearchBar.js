import React, { Component } from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

class SearchBar extends Component {
    static propTypes = {
        searchDeals: PropTypes.func.isRequired
    }
    state={
     searchTerm: ''
    };
onSearchChange= (searchTerm) => {
        this.setState({ searchTerm }, () => {
        this.debouncedSearchDeals(this.state.searchTerm);
        });
    }

    searchDeals = (searchTerm) => {
    this.props.searchDeals(searchTerm);
    this.inputElement.blur();
    }
    debouncedSearchDeals = debounce(this.searchDeals, 300)
    render() {
        return (
            <TextInput
                ref={(inputElement) => {this.inputElement = inputElement}}
            style={styles.input}
            placeholder="search for deals"
            onChangeText={this.onSearchChange}
            />
        );
    }
}

const styles={
    input: {
        height: 40,
        marginHorizontal: 10

    }
}

export default SearchBar;