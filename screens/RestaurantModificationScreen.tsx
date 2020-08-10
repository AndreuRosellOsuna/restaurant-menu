import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import Firebase from '../Firebase';
import { TextInput } from 'react-native-gesture-handler';
import { Restaurant } from '../types';

export default function RestaurantModificationScreen({route, navigation}) {

    const {restaurantId} = route.params;
    
    const [restaurant, setRestaurant] = React.useState(
        {
            "name": "",
            "description": ""
        });

    var textChanged  = (text, field) => {
        setRestaurant({...restaurant, [field]: text})
    }

    React.useEffect(() => {
        Firebase.shared.getRestaurantById(restaurantId, setRestaurant);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.name}>Name :</Text>
            <Text >{restaurant.name}</Text>
            <TextInput style={styles.input}
                onChangeText={text => textChanged(text, 'name')}
                defaultValue={restaurant.name}
                />
            <Text style={styles.name}>Description :</Text>
            <Text >{restaurant.description}</Text>
            <TextInput style={styles.input}
                onChangeText={text => textChanged(text, 'description')}
                defaultValue={restaurant.description}
                />
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
        backgroundColor: 'grey'
    }
});