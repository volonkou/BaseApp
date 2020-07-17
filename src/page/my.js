import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import NavigationUtil from "../navigator/navigationUtil";
import actions from "../action"

class MyPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        NavigationUtil.navigation = this.props.navigation;
        return <View style={[styles.container,{backgroundColor:this.props.theme.themeColor}]}>
                <TouchableHighlight onPress={() => {
                    const { onShowCustomThemeView } = this.props
                    onShowCustomThemeView(true)
                }}>
                    <Text style={{color:"#fff"}}>Change Color</Text>
                </TouchableHighlight>
            </View>
    }
}



const mapStateToProps = state => ({
    theme: state.theme.theme,
});

const mapDispatchToProps = dispatch => ({
    onShowCustomThemeView: (show) => dispatch(actions.onShowCustomThemeView(show)),
});


export default connect(mapStateToProps, mapDispatchToProps)(MyPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:'center'
    }
})