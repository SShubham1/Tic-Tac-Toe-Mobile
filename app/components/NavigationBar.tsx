import { StackHeaderProps } from "@react-navigation/stack";


import { useRoute } from '@react-navigation/native';

import React from "react";
import { Appbar } from "react-native-paper";
import { HEAD_BG_COLOR_DARK, HEAD_BG_COLOR_LIGHT } from "../colors";
import { Image } from 'react-native'

interface NavigationBarProps extends StackHeaderProps {
    isDark: boolean;
    setisDark: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavigationBar({ navigation, back, isDark, setisDark }: NavigationBarProps) {
    const route = useRoute();
    return (
        <Appbar.Header style={{ backgroundColor: isDark ? HEAD_BG_COLOR_DARK : HEAD_BG_COLOR_LIGHT }}>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={route.name === "Home" ? "Tic-Tac-Toe" : route.name} />
            <Appbar.Action icon={isDark ? "weather-night" : "white-balance-sunny"} color={isDark ? "white" : undefined} onPress={() => setisDark(!isDark)} />
        </Appbar.Header>
    );
}
