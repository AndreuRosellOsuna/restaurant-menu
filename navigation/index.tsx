import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList, AuthStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Navigator from './Navigator';
import { AuthUserContext } from '../auth/AuthUserProvider';
import WelcomeScreen from '../auth/WelcomeScreen';
import Firebase from '../Firebase';
import LoginScreen from '../auth/LoginScreen';


// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { user, setUser } = React.useContext(AuthUserContext);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribeAuth = Firebase.shared.observeUserAuth(setUser, setLoading);
    return unsubscribeAuth;
  }, []);
  
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {user ? <RootNavigator/> : <AuthNavigator/>}
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={Navigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="Welcome" headerMode="none">
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}
