import * as React from 'react';
import { Restaurant } from '../types';

export default function useRestaurantName(navigation : any, restaurant : Restaurant) {
    
    React.useLayoutEffect(()=> {
        navigation.setOptions({
            headerTitle: restaurant.name
        });
    }, [navigation, restaurant]);
}