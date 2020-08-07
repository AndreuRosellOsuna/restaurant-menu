export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  HomeBottomTab: undefined
  SettingsBottomTab: undefined;
};

export type HomeParamList = {
  RestaurantScreen: undefined;
  RestaurantDetailScreen: undefined;
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
  id: number,
  name : string,
  restaurantType : RestaurantType
}