import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import HomePage from './view/HomePage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsPage from './view/SettingsPage';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import FilesPage from './view/FilesPage';
import AccountPage from './view/AccountPage';

const Tab = createMaterialBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar animated={true} backgroundColor="#f2f2f2" barStyle="dark-content" />
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#6f9dab"
        shifting={true}>
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Files"
          component={FilesPage}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="file" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsPage}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="cog" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountPage}
          options={{
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons
                name="account-circle"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
