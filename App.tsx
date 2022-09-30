import { useDeviceOrientation } from '@react-native-community/hooks';
import { StatusBar, Platform, StyleSheet, SafeAreaView, View, Appearance } from 'react-native'
import MainScreen from './app/screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import NavigationBar from './app/components/NavigationBar';
import { Provider } from 'react-native-paper';
import RoomScreen from './app/screens/RoomScreen';
import { HEAD_BG_COLOR_DARK, HEAD_BG_COLOR_LIGHT } from './app/colors';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
const Stack = createStackNavigator();

export default function App() {
  const [isDark, setisDark] = React.useState(Appearance.getColorScheme() === "dark");
  StatusBar.setBackgroundColor(isDark ? HEAD_BG_COLOR_DARK : HEAD_BG_COLOR_LIGHT);
  StatusBar.setBarStyle(isDark ? "light-content" : "dark-content");
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: (props) => <NavigationBar isDark={isDark} setisDark={setisDark} {...props} />,
          }}>
          <Stack.Screen name="Home">
            {props => <MainScreen {...props} isDark={isDark} />}
          </Stack.Screen>
          <Stack.Screen name="Room">
            {props => <RoomScreen {...props} isDark={isDark} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}