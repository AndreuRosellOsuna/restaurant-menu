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

let restaurant3 : Restaurant = {
    id: 3,
    name : "Sandacos",
    restaurantType : RestaurantType.PIZZERIA
}
restaurants.push(restaurant3);

let restaurant4 : Restaurant = {
    id: 4,
    name : "La masia",
    restaurantType : RestaurantType.KEBAP
}
restaurants.push(restaurant4);

let restaurant5 : Restaurant = {
    id: 5,
    name : "McDonalds",
    restaurantType : RestaurantType.BURGUERS
}
restaurants.push(restaurant5);

export default restaurants;
