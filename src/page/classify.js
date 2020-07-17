import React, { Component } from 'react';
import { StyleSheet,Text, View} from 'react-native';
import NavigationUtil from "../navigator/navigationUtil";
import { connect } from 'react-redux'

class ClassifyPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        NavigationUtil.navigation = this.props.navigation;
        return <View style={[styles.container,{backgroundColor:this.props.theme.themeColor}]}>
                <Text style={{color:"#fff"}}>ClassifyPage</Text>
            </View>
    }
}


const mapStateToProps = state => ({
    theme: state.theme.theme,
});


export default connect(mapStateToProps)(ClassifyPage);

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:'center'
    }
})