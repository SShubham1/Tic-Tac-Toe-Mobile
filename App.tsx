import { StatusBar, Appearance } from 'react-native'
import MainScreen from './app/screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CustomAppBar from './app/components/CustomAppBar';
import { Provider } from 'react-native-paper';
import RoomScreen from './app/screens/RoomScreen';
import { HEAD_BG_COLOR_DARK, HEAD_BG_COLOR_LIGHT } from './app/colors';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const AsyncStorage = useAsyncStorage("theme");

export default function App() {
  const [isDark, setisDark] = React.useState(Appearance.getColorScheme() === "dark");
  const [isGame, setIsGame] = React.useState(false);

  function setDark(isDark: boolean) {
    setisDark(isDark);
    AsyncStorage.setItem(isDark ? "dark" : "light");
  }
  AsyncStorage.getItem().then(theme => {
    if (theme)
      setisDark(theme === "dark");
    else
      AsyncStorage.setItem(isDark ? "dark" : "light");
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
            {props => <MainScreen setIsGame={setIsGame} isGame={isGame} {...props} isDark={isDark} />}
          </Stack.Screen>
          <Stack.Screen name="Rooms">
            {props => <RoomScreen setIsGame={setIsGame} isGame={isGame} {...props} isDark={isDark} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider >
  );
}