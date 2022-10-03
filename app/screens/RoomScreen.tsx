import { ParamListBase } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, ScrollView, Text, ActivityIndicator, View, Animated } from "react-native"
import { TextInput } from "react-native";
import { APP_BG_COLOR_DARK, APP_BG_COLOR_LIGHT } from "../colors";
import RoomInfo from "../components/RoomInfo";


interface RoomScreenProps extends StackScreenProps<ParamListBase, "Rooms"> {
    isDark: boolean;
    setIsGame: React.Dispatch<React.SetStateAction<boolean>>;
    isGame: boolean;
}

export interface Room {
    guest: {
        player: 'O' | 'X';
    };
    host: {
        id: string;
        name: string;
    };
    id: string;
    isFull: boolean;
}


function Rooms({ isDark, navigation, setIsGame }: RoomScreenProps) {
    const [name, setName] = React.useState("");
    const [rooms, setRooms] = React.useState(([] as Room[] | undefined));
    const [isFetched, setIsFetched] = React.useState(false);
    const animPos = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        fetch("https://tic-tac-toe-multiplayer-blue.herokuapp.com/api/rooms").then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                setIsFetched(true)
                setRooms(undefined)
            }
        }).then((data: Room[]) => {
            setRooms(data);
            setIsFetched(true)
        }).catch(() => {
            setIsFetched(true)
            setRooms(undefined)
        }
        );
    }, [rooms]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDark ? APP_BG_COLOR_DARK : APP_BG_COLOR_LIGHT,
            paddingTop: 5,
        },
        text: {
            color: isDark ? "white" : "black",
        },
        input: {
            height: 40,
            margin: 1,
            color: isDark ? "white" : "black",
            backgroundColor: isDark ? APP_BG_COLOR_DARK : APP_BG_COLOR_LIGHT,
            borderWidth: 1,
            borderColor: isDark ? "white" : "black",
            padding: 10,
            borderRadius: 10
        },
    });

    const onAnimPos = () => {
        Animated.timing(
            animPos, { toValue: 1, duration: 100, useNativeDriver: true }
        ).start();
    }
    return (
        <View style={styles.container}>
            {rooms ? rooms.length !== 0 ?
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                    <Animated.View style={{ width: "99%", left: animPos }}>
                        <TextInput maxLength={20} textAlign={"center"} disableFullscreenUI={true} placeholderTextColor={isDark ? "grey" : ""} placeholder="Enter your Name" style={styles.input} value={name} onChangeText={setName} />
                    </Animated.View>
                </View> : null : null
            }
            <ScrollView contentContainerStyle={{ alignItems: "center", flexGrow: rooms ? rooms.length === 0 ? 1 : undefined : 1, justifyContent: rooms ? rooms.length === 0 ? "center" : undefined : "center" }}>
                {
                    rooms ?
                        isFetched ?
                            rooms.length === 0 ?
                                <Text style={styles.text}>No Room Available!</Text> :
                                rooms.map((room, index) => {
                                    return <RoomInfo playerName={name} setIsGame={setIsGame} navigation={navigation} joinName={name} isDark={isDark} hostName={room.host.name} hostPlayer={room.guest.player === "O" ? "X" : "O"} roomId={room.id} key={index} />
                                }) :
                            <ActivityIndicator size={"large"} /> :
                        <>
                            <Text style={styles.text}>Something went wrong!</Text>
                        </>


                }
            </ScrollView>
        </View>
    )
}

export default Rooms