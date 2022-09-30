import { ParamListBase } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native';
import { APP_BG_COLOR_DARK, APP_BG_COLOR_LIGHT } from '../colors';

interface MainScreenProps extends StackScreenProps<ParamListBase, "Home"> {
    isDark: boolean;
}

function MainScreen({ isDark, navigation }: MainScreenProps) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDark ? APP_BG_COLOR_DARK : APP_BG_COLOR_LIGHT,
        },
        text: {
            color: isDark ? "white" : "black",
        }
    });
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Open up App.tsx to start working on your app!</Text>
            <Button title='List ALl Rooms' onPress={() => navigation.navigate("Room")} />
        </View >
    )
}


export default MainScreen
