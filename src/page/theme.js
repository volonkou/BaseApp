import React, { Component } from 'react'
import { DeviceInfo, Modal, TouchableHighlight, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import ThemeAction from "../expand/theme";
import GlobalStyles from "../util/globalStyles";
import ThemeFactory, { ThemeFlags } from "../util/themeFactory";
import actions from "../action";
import { connect } from "react-redux";

class ThemePage extends Component {
    constructor(params) {
        super(params);
        this.ThemeAction = new ThemeAction()
    }
    onSelectTheme = (key) => {
        this.props.onClose()
        this.ThemeAction.save(ThemeFlags[key])
        const { onThemeChange } = this.props
        onThemeChange(ThemeFactory.createTheme(ThemeFlags[key]))
    }

    getThemeItem(key) {
        return <TouchableHighlight
            style={{ flex: 1 }}
            underlayColor='white'
            onPress={() => this.onSelectTheme(key)}
        >
            <View style={[{ backgroundColor: ThemeFlags[key] }, styles.themeItem]}>
                <Text style={styles.themeText}>{key}</Text>
            </View>
        </TouchableHighlight>
    }

    renderThemeItems = () => {
        const List = []
        let data = Object.keys(ThemeFlags)
        for (let i in data) {
            List.push(<View key={i}>
                {this.getThemeItem(data[i])}
            </View>)
        }
        return List
    }
    renderContentView = () => {
        return (
            <Modal>
                <View style={styles.modalContainer}>
                    <ScrollView>
                        {this.renderThemeItems()}
                    </ScrollView>
                </View>
            </Modal>
        )
    }
    render() {
        let view = this.props.visible ? <View style={GlobalStyles.root_container}>
            {this.renderContentView()}
        </View> : null

        return view
    }

}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    onThemeChange: (theme) => dispatch(actions.onThemeChange(theme))
});
export default connect(mapStateToProps, mapDispatchToProps)(ThemePage)


const styles = StyleSheet.create({
    themeItem: {
        flex: 1,
        height: 100,
        margin: 3,
        padding: 3,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        margin: 10,
        marginBottom: 10 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0),
        marginTop: Platform.OS === 'ios' ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 10,
        backgroundColor: 'white',
        borderRadius: 3,
        shadowColor: 'gray',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        padding: 3
    },
    themeText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16
    }
});