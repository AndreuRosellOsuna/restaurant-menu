export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  RestaurantsTab: undefined
  SettingsBottomTab: undefined;
};

export type HomeParamList = {
  RestaurantScreen: undefined;
  RestaurantDetailScreen: undefined;
  RestaurantModificationScreen: undefined;
  RestaurantCreationScreen: undefined;
  MenusScreen: undefined;
  DishesScreen: undefined;
};

export type SettingsParamList = {
  SettingsScreen: undefined;
};

export enum RestaurantType {
  KEBAP = "Kebap",
  PIZZERIA = "Pizzeria",
  BURGUERS = "Burguers"
}

export interface Restaurant {
  id: string,
  name : string,
  restaurantType : RestaurantType,
  description: string,
  imageRef?: string,
  featured?: boolean
}