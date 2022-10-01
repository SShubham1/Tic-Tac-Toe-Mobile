import { StackHeaderProps } from "@react-navigation/stack";
import { useRoute } from '@react-navigation/native';
import React from "react";
import { Appbar } from "react-native-paper";
import { HEAD_BG_COLOR_DARK, HEAD_BG_COLOR_LIGHT } from "../colors";
import { SvgXml } from 'react-native-svg';
import { favicon } from '../favicon';

interface NavigationBarProps extends StackHeaderProps {
    isDark: boolean;
    setisDark: (isDark: boolean) => void;
}

export default function CustomAppBar({ navigation, back, isDark, setisDark }: NavigationBarProps) {
    const route = useRoute();
    return (
        <Appbar.Header style={{ backgroundColor: isDark ? HEAD_BG_COLOR_DARK : HEAD_BG_COLOR_LIGHT }}>
            {route.name === "Home" ?
                <SvgXml xml={favicon} />
                : null}
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={route.name === "Home" ? "Tic-Tac-Toe" : route.name} />
            <Appbar.Action icon={isDark ? "weather-night" : "white-balance-sunny"} color={isDark ? "white" : undefined} onPress={() => setisDark(!isDark)} />
        </Appbar.Header>
    );
}
