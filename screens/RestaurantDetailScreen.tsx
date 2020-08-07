import * as React from 'react';
import { Text, View } from '../components/Themed';
import Firebase from '../Firebase';

export default function RestaurantDetailScreen({route}) {

    const {restaurantId} = route.params;
    
    const [restaurant, setRestaurant] = React.useState({});

    React.useEffect(() => {
        Firebase.shared.getRestaurantById(restaurantId, setRestaurant);
    });

    return (
        <View>
            <Text>{restaurant.name}</Text>
        </View>
    );
}