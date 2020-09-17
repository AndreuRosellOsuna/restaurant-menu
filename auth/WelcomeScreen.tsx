import React from 'react';
import { Button } from 'react-native-elements';
import { View, Text } from '../components/Themed';

export default function WelcomeScreen({navigation}) {

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>hi!!</Text>
            <Button title="Login" onPress={() => navigation.navigate('Login')}/>
        </View>
    );
}