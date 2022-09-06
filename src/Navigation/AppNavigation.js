import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  WelcomeScene,
  HomeScene,
  NewRequestScene,
  RequestMoneyScene,
} from '../Scenes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BackgroundHOC} from '../Common';

const getRoutes = () => {
  const appRoutes = {
    WelcomeScene: BackgroundHOC(WelcomeScene, {type: 'welcome'}),
    HomeScene: HomeScene,
    NewRequest: BackgroundHOC(NewRequestScene),
    RequestMoneyScene: BackgroundHOC(RequestMoneyScene),
  };
  return appRoutes;
};

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="WelcomeScene"
          screenOptions={() => ({
            headerShown: false,
          })}
          detachInactiveScreens={false}>
          {Object.keys(getRoutes()).map(item => (
            <Stack.Screen
              key={item}
              name={item}
              component={getRoutes()[item]}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
