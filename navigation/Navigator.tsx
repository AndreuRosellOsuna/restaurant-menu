// import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import RestaurantsScreen from '../screens/RestaurantsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { BottomTabParamList, HomeParamList, SettingsParamList } from '../types';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import RestaurantModificationScreen from '../screens/RestaurantModificationScreen';
import RestaurantCreationScreen from '../screens/RestaurantNewScreen';
import { Icon } from 'react-native-elements';
import { textColor } from '../constants/Colors'


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function Navigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="RestaurantsTab"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="RestaurantsTab"
        component={RestaurantsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="restaurant" color={color}/>,
          title: "Restaurants"
        }}
      />
      <BottomTab.Screen
        name="SettingsBottomTab"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-settings" color={color} type="ionicon"/>,
          title: "Settings"
        }
        }
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string; type?: string}) {
  return <Icon size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStackNavigator = createStackNavigator<HomeParamList>();

const customHeaderOptions : {} = {
  headerTitleAlign: 'left',
  headerBackTitleVisible: false,
  headerTintColor: textColor
}

function RestaurantsTabNavigator() {
  return (
    <HomeStackNavigator.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#A2D6D6'
        }
      }}>
      <HomeStackNavigator.Screen
        name="RestaurantScreen"
        component={RestaurantsScreen}
        options={{ 
          headerTitle: 'Restaurants',
          ...customHeaderOptions
         }}
      />
      <HomeStackNavigator.Screen
        name="RestaurantDetailScreen"
        component={RestaurantDetailScreen}
        options={{ 
          headerTitle: 'Restaurant detail',
          ...customHeaderOptions
        }}
      />
      <HomeStackNavigator.Screen
        name="RestaurantModificationScreen"
        component={RestaurantModificationScreen}
        options={{ 
          headerTitle: 'Restaurant modification',
          ...customHeaderOptions
        }}
      />
      <HomeStackNavigator.Screen
        name="RestaurantCreationScreen"
        component={RestaurantCreationScreen}
        options={{ 
          headerTitle: 'Create a new Restaurant',
          ...customHeaderOptions
        }}
      />
    </HomeStackNavigator.Navigator>
  );
}

const SettingsStackNavigator = createStackNavigator<SettingsParamList>();

function SettingsNavigator() {
  return (
    <SettingsStackNavigator.Navigator>
      <SettingsStackNavigator.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </SettingsStackNavigator.Navigator>
  );
}
