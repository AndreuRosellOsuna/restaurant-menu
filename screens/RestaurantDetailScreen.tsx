import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Text, View } from '../components/Themed';
import Firebase from '../Firebase';

export default function RestaurantDetailScreen({route, navigation}) {

    const {restaurantId} = route.params;
    
    const [restaurant, setRestaurant] = React.useState(
        {
            "name": "",
            "description": ""
        });

    let modifyRestaurant = () => {
        navigation.navigate('RestaurantModificationScreen', {restaurantId: restaurantId})
    }

    React.useEffect(() => {
        Firebase.shared.getRestaurantById(restaurantId, setRestaurant);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.description}>{restaurant.description}</Text>
            <Button
                onPress={modifyRestaurant}
                title="Modify"
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
        backgroundColor: 'powderblue',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
    },
    description : {
        marginStart: 30,
        color: 'steelblue',
        fontSize: 15,
        fontStyle: 'italic',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
});