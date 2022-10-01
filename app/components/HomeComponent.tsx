import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { Text, View, Button, StyleSheet, TextInput, TouchableNativeFeedback, ScrollView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { APP_BG_COLOR_DARK, APP_BG_COLOR_LIGHT, BLUE_BUTTON_COLOR } from '../colors';
import { oSvg } from '../o';
import { xSvg } from '../x';
import { useDeviceOrientation } from '@react-native-community/hooks';

interface HomeComponentProps {
    isDark: boolean;
    navigation: StackNavigationProp<ParamListBase, "Home", undefined>;
    player: "X" | "O";
    setPlayer: React.Dispatch<React.SetStateAction<"X" | "O">>;
    setIsGame: React.Dispatch<React.SetStateAction<boolean>>;
    playerName: string;
    room: string;
    setPlayerName: React.Dispatch<React.SetStateAction<string>>;
    setRoom: React.Dispatch<React.SetStateAction<string>>;
}

function HomeComponent({ isDark, navigation, player, setPlayer, setIsGame, playerName, setPlayerName }: HomeComponentProps) {
    const isLandscape = useDeviceOrientation().landscape;
    const [room, setRoom] = React.useState("");
    const [joinName, setJoinName] = React.useState("");
    const [hostName, setHostName] = React.useState("");
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDark ? APP_BG_COLOR_DARK : APP_BG_COLOR_LIGHT,
        },
        text: {
            color: isDark ? "white" : "black",
            textAlign: "center",
        },
        input: {
            height: 40,
            margin: 1,
            borderWidth: 1,
            color: isDark ? "white" : "black",
            borderColor: isDark ? "white" : "black",
            padding: 10,
            borderRadius: 10
        },
    });
    return (
        <ScrollView contentContainerStyle={{ alignItems: "center", justifyContent: "center", flexGrow: 1 }} style={styles.container}>
            <Text style={[styles.text, { fontSize: 30, fontWeight: "bold" }]}>Welcome to Tic-Tac-Toe!</Text>
            <View style={{ flexDirection: isLandscape ? "row" : "column", justifyContent: "center" }}>
                <View style={{ borderColor: isDark ? "lightblue" : "blue", borderWidth: 1, borderRadius: 10, padding: 5, margin: 5, width: 200 }}>
                    <Text style={[styles.text, { fontSize: 20, fontWeight: "500" }]}>
                        Host a Game
                    </Text>
                    <TextInput maxLength={20} textAlign={"center"} disableFullscreenUI={true} placeholderTextColor={isDark ? "grey" : ""} style={styles.input} value={hostName} onChangeText={setHostName} placeholder={"Enter your Name"} />
                    <Text style={[styles.text, { fontSize: 20, fontWeight: "500" }]}>
                        Pick One!
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        <TouchableNativeFeedback onPress={() => setPlayer('X')}>
                            <SvgXml style={{ borderColor: isDark ? "lightblue" : "blue", borderWidth: player === 'X' ? 1 : 0, borderRadius: 5 }} xml={xSvg} />
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={() => setPlayer('O')}>
                            <SvgXml style={{ borderColor: isDark ? "lightblue" : "blue", borderWidth: player === 'O' ? 1 : 0, borderRadius: 5 }} xml={oSvg} />
                        </TouchableNativeFeedback>
                    </View>
                    <TouchableNativeFeedback onPress={() => setIsGame(true)}>
                        <View style={{ backgroundColor: BLUE_BUTTON_COLOR, borderRadius: 5, alignSelf: "center", marginTop: 1, marginBottom: 1 }}>
                            <Text style={{ fontSize: 18, color: "white", padding: 5 }}>
                                Host
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{ borderColor: isDark ? "lightblue" : "blue", borderWidth: 1, borderRadius: 10, padding: 5, margin: 5, width: 200 }}>
                    <Text style={[styles.text, { fontSize: 20, fontWeight: "500" }]}>
                        Join a Game
                    </Text>
                    <TextInput maxLength={20} textAlign={"center"} disableFullscreenUI={true} placeholderTextColor={isDark ? "grey" : ""} style={styles.input} value={joinName} onChangeText={setJoinName} placeholder={"Enter your Name"} />
                    <TextInput maxLength={20} textAlign={"center"} disableFullscreenUI={true} placeholderTextColor={isDark ? "grey" : ""} style={styles.input} value={room} onChangeText={setRoom} placeholder={"Enter Room ID"} />
                    <TouchableNativeFeedback>
                        <View style={{ backgroundColor: BLUE_BUTTON_COLOR, borderRadius: 5, alignSelf: "center", marginTop: 1, marginBottom: 1 }}>
                            <Text style={{ fontSize: 18, color: "white", padding: 5 }}>
                                Join
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
            <Button title='List All Rooms' onPress={() => navigation.navigate("Rooms")} />
        </ScrollView >
    )
}


export default HomeComponent