import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import RestaurantsScreen from '../screens/RestaurantsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { BottomTabParamList, HomeParamList, SettingsParamList } from '../types';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';


const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function Navigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeBottomTab"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="HomeBottomTab"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
          title: "Home"
        }}
      />
      <BottomTab.Screen
        name="SettingsBottomTab"
        component={SettingsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-settings" color={color} />,
          title: "Settings"
        }
        }
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStackNavigator = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStackNavigator.Navigator >
      <HomeStackNavigator.Screen
        name="RestaurantScreen"
        component={RestaurantsScreen}
        options={{ headerTitle: 'Home' }}
      />
      <HomeStackNavigator.Screen
        name="RestaurantDetailScreen"
        component={RestaurantDetailScreen}
        options={{ headerTitle: 'Restaurant detail' }}
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
