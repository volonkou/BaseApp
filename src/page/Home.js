import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import NavigationUtil from "../navigator/navigationUtil";
import { connect } from 'react-redux'



class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;
        return <View style={[styles.container, { backgroundColor: this.props.theme.themeColor }]}>
            <Text style={{ color: "#fff" }}>{this.props.language.tab1}</Text>
        </View>

    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    language: state.language.language,
});

export default connect(mapStateToProps)(HomePage);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }
})