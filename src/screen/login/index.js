import React, { useState } from "react";
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
    TextInput, 
    StatusBar, 
    Image,
    Alert,
} from "react-native";
import logo from '../../../assets/logo-login.png'
import { axioz } from "../../config/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {

    const [urn, setUsername] = useState('');
    const [pwd, setPassword] = useState('');

    const handleLogin = async () => {
        if(!urn){
            Alert.alert("Username tidak boleh kosong!")
            return;
        }
        if(!pwd){
            Alert.alert("Password tidak boleh kosong!")
            return;
        }

        await axioz.post(`/signin`,{
            urn: urn.toLocaleLowerCase(),
            pwd: pwd
        })
            .then(result => {
                if (result.status == 200) {
                    if(typeof result.data.response.token === 'string'){
                        if(AsyncStorage.setItem('authUser', result.data.response.token)){
                            navigation.replace('Maps');
                        }else{
                            Alert.alert('Username atau password salah! Coba lagi!')
                        }
                    }else{
                        Alert.alert('Username atau password salah! Coba lagi!')
                    }
                }
            })
            .catch(err => {
                console.log(err)
                Alert.alert('Username atau password salah! Coba lagi.')
            })
        return;
    }

    return (
        <View style={{ backgroundColor: '#e6eefc', flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                style={styles.logo}
                source={logo}
                />
            </View>
            <View
                style={{
                    flex: 1
                }}
            >
                <TextInput
                    style={styles.input}
                    placeholder="Input Username Disini"
                    onChangeText={(e) => setUsername(e)}
                    defaultValue={urn}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Input Password Disini"
                    onChangeText={(e) => setPassword(e)}
                    defaultValue={pwd}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => handleLogin()}
                >
                    <Text style={styles.login}>Masuk</Text>
                </TouchableOpacity>
            </View>
            <View
            >
                <Text style={styles.footer}>2022 {'\u00A9'} PT. Bali Internasional Teknologi</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        color: 'black',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        marginHorizontal: 20,
        paddingTop: 30
    },
    text: {
        fontSize: 16,
        padding: 13,
        paddingBottom: 1
    },
    btn: {
        backgroundColor: 'blue',
        marginHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        elevation: 5,
        marginTop: 50,
        marginVertical: 15
    },
    login: {
        fontSize: 16,
        color: "#fff",
        fontWeight: 'bold',
        textAlign: 'center'
    },
    logo: {
        width: 200,
        height: 150,
        resizeMode: 'stretch'
    },
    footer: {
        textAlign: 'center',
        marginVertical: 10
    }
});