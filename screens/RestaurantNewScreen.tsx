import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import Firebase from '../Firebase';
import { TextInput } from 'react-native-gesture-handler';
import { RestaurantType } from '../types';

export default function RestaurantCreationScreen({navigation}) {

    const [restaurant, setRestaurant] = React.useState(
        {
            "name": "",
            "description": "",
            "restaurantType": RestaurantType.KEBAP
        });

    var textChanged  = (text, field) => {
        setRestaurant({...restaurant, [field]: text})
    }

    let save = () => {
        Firebase.shared.createNewRestaurant(restaurant, () => navigation.goBack());
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name}>Name :</Text>
            <TextInput style={styles.input}
                onChangeText={text => textChanged(text, 'name')}
                />
            <Text style={styles.name}>Description :</Text>
            <TextInput style={styles.input}
                onChangeText={text => textChanged(text, 'description')}
                />

            <Button 
                title="Save"
                onPress={save} />
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,   
    },
    name : {
        height: 30,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginStart: 30,
        marginTop: 40,
        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
    },
    input: {
        backgroundColor: 'grey',
        fontSize: 20,
    }
});