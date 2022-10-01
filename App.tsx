import { StatusBar, Appearance } from 'react-native'
import MainScreen from './app/screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CustomAppBar from './app/components/CustomAppBar';
import { Provider } from 'react-native-paper';
import RoomScreen from './app/screens/RoomScreen';
import { HEAD_BG_COLOR_DARK, HEAD_BG_COLOR_LIGHT } from './app/colors';
import { AsyncStorage } from 'react-native'

const Stack = createStackNavigator();




export default function App() {
  const [isDark, setisDark] = React.useState(Appearance.getColorScheme() === "dark");
  function setDark(isDark: boolean) {
    setisDark(isDark);
    AsyncStorage.setItem("theme", isDark ? "dark" : "light");
  }
  AsyncStorage.getItem("theme").then(theme => {
    if (theme)
      setisDark(theme === "dark");
    else
      AsyncStorage.setItem("theme", isDark ? "dark" : "light");
  })
  StatusBar.setBackgroundColor(isDark ? HEAD_BG_COLOR_DARK : HEAD_BG_COLOR_LIGHT);
  StatusBar.setBarStyle(isDark ? "light-content" : "dark-content");
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: (props) => <CustomAppBar isDark={isDark} setisDark={setDark} {...props} />,
          }}>
          <Stack.Screen name="Home">
            {props => <MainScreen {...props} isDark={isDark} />}
          </Stack.Screen>
          <Stack.Screen name="Room">
            {props => <RoomScreen {...props} isDark={isDark} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider >
  );
}