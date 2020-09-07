import { View, Text } from '../components/Themed';
import { Input, Button } from 'react-native-elements';
import * as React from 'react';
import Firebase from '../Firebase';
import { StyleSheet } from 'react-native';

export default function LoginScreen() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loginError, setLoginError] = React.useState("");

    const doLogin = async () => {
        try {
            await Firebase.shared.loginWithEmail(email, password);
        } catch (error) {
            setLoginError(error.message);
        }
    };

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Login Screen</Text>
            <Input 
                label="Email"
                placeholder="example@mail.com"
                onChangeText={text => {
                    setLoginError("");
                    setEmail(text);
                }}
            />
            <Text>Login Screen</Text>
            <Input 
                label="Password"
                secureTextEntry={true}
                onChangeText={text => {
                    setLoginError("");
                    setPassword(text);
                }}
            />
            <Text style={styles.loginError}>{loginError}</Text>
            <Button 
                title="Login"
                onPress={doLogin}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    loginError: {
        color: 'red'
    }
});