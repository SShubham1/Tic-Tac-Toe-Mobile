import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, ScrollView } from 'react-native'
import { SvgXml } from 'react-native-svg';
import { APP_BG_COLOR_DARK, APP_BG_COLOR_LIGHT } from '../colors';
import { drawSvg } from '../draw';
import { oSvg } from '../o';
import { xSvg } from '../x';
import { io } from 'socket.io-client';
import { Room } from '../screens/RoomScreen';

interface GameComponentProps {
    isDark: boolean;
    navigation: StackNavigationProp<ParamListBase, "Home", undefined>;
    setIsGame: React.Dispatch<React.SetStateAction<boolean>>;
    xName?: string;
    oName?: string;
    xScore: number;
    oScore: number;
    drawScore: number;
    player: "X" | "O";
    setPlayerName: React.Dispatch<React.SetStateAction<string>>;
    roomId: string | undefined;
    route: RouteProp<ParamListBase, "Home">;
}

const GameComponent = ({ isDark, setIsGame, xName, xScore, oName, oScore, drawScore, player, setPlayerName, roomId, route, navigation }: GameComponentProps) => {
    const socketRef = React.useRef((undefined as ReturnType<typeof io> | undefined));
    const [room, setRoom] = React.useState((undefined as Room | undefined));
    const [xNamer, setXName] = React.useState(xName);
    const [oNamer, setOName] = React.useState(oName);

    useEffect(() => {
        if (!roomId && route.params) {
            roomId = (route.params as { roomId: string }).roomId;
        }
        if (route.params) {
            if ((route.params as { playerName: string }).playerName) {
                setPlayerName((route.params as { playerName: string }).playerName);
            }
        }
        socketRef.current = io("https://tic-tac-toe-multiplayer-blue.herokuapp.com/", { path: "/api/rooms" });
        socketRef.current.on("connect", () => {
            if (roomId) {
                socketRef.current?.emit("join-room", {

                    name: xName || oName ?
                        (player === "X" ? xName : oName) :
                        ((route.params as { playerName: string }).playerName) ?
                            (((route.params as { playerName: string }).playerName)) : "Anonymous"
                    ,
                    room: roomId
                })
            } else {
                socketRef.current?.emit("create-room", { player: player, name: player === "X" ? xName ? xName : "Anonymous" : oName ? oName : "Anonymous" });
            }
        });
        socketRef.current.on("disconnect", () => {
            setIsGame(false);
            setPlayerName("");
            navigation.navigate("Home");
        })
        socketRef.current.on("room-created", (p_room: Room) => {
            setRoom(p_room);
        })
        socketRef.current.on("room-joined", (p_room: Room | undefined) => {
            setRoom(p_room);
            player === "O" ? setXName(room?.host.name) : setOName(room?.host.name);
        })
    }, [socketRef, oNamer, xNamer])
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDark ? APP_BG_COLOR_DARK : APP_BG_COLOR_LIGHT,
        },
        text: {
            color: isDark ? "white" : "black",
        },
        grid: {
            width: 100,
            height: 100,
            backgroundColor: isDark ? "purple" : "lightblue",
            margin: 1,
            borderRadius: 10,
        }
    });
    function leaveGame() {
        setPlayerName("");
        setIsGame(false);
    }

    return (
        <ScrollView contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
        }} style={styles.container}>
            <Text style={[styles.text, { fontSize: 30, fontWeight: "bold" }]}>Room ID: {room?.id}</Text>
            <View style={{ flexDirection: "column" }}>
                <View style={{ flexDirection: "row" }}>
                    <TouchableNativeFeedback>
                        <View style={styles.grid}></View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.grid}></View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.grid}></View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <TouchableNativeFeedback>
                        <View style={styles.grid}></View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.grid}></View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.grid}></View>
                    </TouchableNativeFeedback>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <TouchableNativeFeedback>
                        <View style={styles.grid}></View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.grid}></View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback>
                        <View style={styles.grid}></View>
                    </TouchableNativeFeedback>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%", padding: 10 }}>
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <SvgXml xml={player === "X" ? xSvg : oSvg} />
                        <Text style={[styles.text, { fontSize: 20, textAlignVertical: "center" }]}>: {player === "X" ? xScore : oScore}</Text>
                    </View>
                    <Text style={[styles.text, { fontSize: 20, textAlign: "center" }]}>{player === "X" ? xNamer : oNamer}</Text>
                </View>
                <View style={{ flexDirection: "row", height: 60 }}>
                    <SvgXml xml={drawSvg} height={60} width={80} style={{ alignItems: "center" }} />
                    <Text style={[styles.text, { fontSize: 20, textAlignVertical: "center" }]}>: {drawScore}</Text>
                </View>
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <SvgXml xml={player === "X" ? oSvg : xSvg} />
                        <Text style={[styles.text, { fontSize: 20, textAlignVertical: "center" }]}>: {player === "X" ? oScore : xScore}</Text>
                    </View>
                    <Text style={[styles.text, { fontSize: 20, textAlign: "center" }]}>{player === "X" ? oNamer : xNamer}</Text>
                </View>
            </View>
            <Text style={[styles.text, { fontSize: 18, fontWeight: "500" }]}>Waiting for player to join the Game...</Text>
            <TouchableNativeFeedback onPress={() => { socketRef.current?.connected ? socketRef.current?.disconnect() : leaveGame() }}>
                <View style={{ backgroundColor: "red", borderRadius: 5, alignSelf: "center", marginTop: 10, marginBottom: 1 }}>
                    <Text style={{ fontSize: 18, color: "white", padding: 5 }}>
                        Leave
                    </Text>
                </View>
            </TouchableNativeFeedback>
        </ScrollView>
    )
}

export default GameComponent