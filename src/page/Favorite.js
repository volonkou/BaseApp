import React, { Component } from 'react';
import { StyleSheet,Text, View} from 'react-native';
import NavigationUtil from "../navigator/navigationUtil";
import { connect } from 'react-redux'

class FavoritePage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        NavigationUtil.navigation = this.props.navigation;
        return <View style={[styles.container,{backgroundColor:this.props.theme.themeColor}]}>
                <Text style={{color:"#fff"}}>{this.props.language.tab3}</Text>
            </View>
    }
}


const mapStateToProps = state => ({
    theme: state.theme.theme,
    language:state.language.language,
});


export default connect(mapStateToProps)(FavoritePage);

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:'center'
    }
})