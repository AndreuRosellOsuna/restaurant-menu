import { Restaurant, RestaurantType } from './types';

let restaurants : Restaurant[] = [];

let restaurant1 : Restaurant = {
    id: 1,
    name : "La neu",
    restaurantType : RestaurantType.PIZZERIA
}
restaurants.push(restaurant1);

let restaurant2 : Restaurant = {
    id: 2,
    name : "Tandori",
    restaurantType : RestaurantType.KEBAP
}
restaurants.push(restaurant2);

export default restaurants;
