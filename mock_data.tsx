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

let restaurant6 : Restaurant = {
    id: 6,
    name : "McDonalds2",
    restaurantType : RestaurantType.BURGUERS
}
restaurants.push(restaurant6);

let restaurant7 : Restaurant = {
    id: 7,
    name : "McDonalds3",
    restaurantType : RestaurantType.BURGUERS
}
restaurants.push(restaurant7);

let restaurant8 : Restaurant = {
    id: 8,
    name : "McDonalds8",
    restaurantType : RestaurantType.BURGUERS
}
restaurants.push(restaurant8);

let restaurant9 : Restaurant = {
    id: 9,
    name : "McDonalds9",
    restaurantType : RestaurantType.BURGUERS
}
restaurants.push(restaurant9);

let restaurant10 : Restaurant = {
    id: 10,
    name : "McDonalds 10",
    restaurantType : RestaurantType.BURGUERS
}
restaurants.push(restaurant10);

export default restaurants;
