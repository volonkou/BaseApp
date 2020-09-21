import React, { Component } from 'react'
import { DeviceInfo, Modal, TouchableHighlight, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import LanguageAction from "../expand/language";
import GlobalStyles from "../util/globalStyles";
import LanguageFactory, { LanguageFlags } from "../util/languageFactory";
import actions from "../action";
import { connect } from "react-redux";

class LanguagePage extends Component {
    constructor(params) {
        super(params);
        this.LanguageAction = new LanguageAction()
    }
    onSelectLanguage = (key) => {
        this.props.onClose()
        this.LanguageAction.save(key)
        const { onLanguageChange } = this.props
        onLanguageChange(LanguageFactory.createLanguage(key))
    }

    getLanguageItem(key) {
        return <TouchableHighlight
            style={{ flex: 1 }}
            underlayColor='white'
            onPress={() => this.onSelectLanguage(key)}
        >
            <View style={[{ backgroundColor: "#ff0000" }, styles.themeItem]}>
                <Text style={styles.themeText}>{LanguageFlags[key]}</Text>
            </View>
        </TouchableHighlight>
    }

    renderLanguageItems = () => {
        const List = []
        let data = Object.keys(LanguageFlags)
        for (let i in data) {
            List.push(<View key={i}>
                {this.getLanguageItem(data[i])}
            </View>)
        }
        return List
    }
    renderContentView = () => {
        return (
            <Modal>
                <View style={styles.modalContainer}>
                    <ScrollView>
                        {this.renderLanguageItems()}
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
    onLanguageChange: (language) => dispatch(actions.onLanguageChange(language))
});
export default connect(mapStateToProps, mapDispatchToProps)(LanguagePage)


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