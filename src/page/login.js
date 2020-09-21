import React, { Component } from "react"
import { View, StyleSheet, Text, TouchableOpacity, Modal, TextInput, } from "react-native"
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from "react-redux";
import { LoginSystem, GetUserDetail } from "../action/system"
import actions from "../action"

class Login extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            name: "",
            password: "",
            state: ""
        }
    }

    HandleLogin = () => {

        const { name, password } = this.state
        LoginSystem({ "name": name, "password": password }).then(res => {
            if (res.debug && res.debug.status_code === 401) {
                console.log(res)
                this.setState({ state: res.message })
            } else {
                GetUserDetail(res.access_token)
                AsyncStorage.setItem("token", res.access_token)
                this.props.onShowLoginView(false)
            }
        })

    }


    renderContentView = () => {
        const { name, password, state } = this.state
        const { language } = this.props
        return (
            <Modal>
                <View style={styles.container}>
                    <View style={styles.logoView}>
                        <View style={{ marginTop: 30 }}>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={{ width: 200, height: 50 }}
                                    underlineColorAndroid='transparent'
                                    placeholder={language.name}
                                    value={this.state.name}
                                    onChangeText={(name) => {
                                        this.setState({ name,state:"" })
                                    }}
                                />
                            </View>
                        </View>

                        <View style={{ marginTop: 30 }}>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={{ width: 200, height: 50 }}
                                    underlineColorAndroid='transparent'
                                    placeholder={language.password}
                                    secureTextEntry={true}
                                    onChangeText={(password) => {
                                        this.setState({ password,state:"" })
                                    }}
                                />
                            </View>
                            <View style={{ margin: 10, marginTop: 20, height: 40,minWidth:100}}>
                                <Text style={{ color: "#ff0000", fontSize: 18 }}>{state}</Text>
                            </View>

                        </View>

                        <View style={{ alignItems: "center" }}>
                            {
                                !name || !password ?
                                    <View style={[styles.loginBtn, { backgroundColor: "#DEDEDE" }]}>
                                        <Text style={{ fontSize: 18, color: "#ffffff" }}>{language.login}</Text>
                                    </View> :
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.HandleLogin()
                                        }}
                                    >
                                        <View style={styles.loginBtn}>
                                            <Text style={{ fontSize: 18, color: "#ffffff" }}>{language.login}</Text>
                                        </View>
                                    </TouchableOpacity>
                            }

                        </View>
                    </View>
                </View>


            </Modal>
        )
    }

    render() {
        let view = this.props.visible ? <View>
            {this.renderContentView()}
        </View> : null

        return view
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F8FF",
        justifyContent: "center",
        alignItems: "center"
        // position: "relative",
    },
    logoView: {
        width: 375,
        height: 400,
        // backgroundColor:"#ff0000",
        // position: "absolute",
        // top: 150,
        alignItems: "center"
    },

    inputView: {
        width: 375 - 70,
        height: 50,
        borderRadius: 8,
        backgroundColor: "#ffffff",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'rgba(209, 215, 241, 0.8)',
        shadowOpacity: 0.9,
        shadowRadius: 8
    },
    loginBtn: {
        width: 150,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        backgroundColor: "#5FB86E"
    }
});


const mapStateToProps = state => ({
    theme: state.theme.theme,
    language: state.language.language,
});

const mapDispatchToProps = dispatch => ({
    onShowLoginView: (show) => dispatch(actions.onShowLoginView(show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)
