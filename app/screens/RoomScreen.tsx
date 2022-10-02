import { ParamListBase } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native"
import { APP_BG_COLOR_DARK, APP_BG_COLOR_LIGHT } from "../colors";
import RoomInfo from "../components/RoomInfo";


interface RoomScreenProps extends StackScreenProps<ParamListBase, "Rooms"> {
    isDark: boolean;
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

function Rooms({ isDark }: RoomScreenProps) {
    const [rooms, setRooms] = React.useState(([] as Room[]));
    React.useEffect(() => {
        fetch("https://tic-tac-toe-multiplayer-blue.herokuapp.com/api/rooms").then(res => res.json()).then((data: Room[]) => setRooms(data));
    }, [rooms]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDark ? APP_BG_COLOR_DARK : APP_BG_COLOR_LIGHT,
            paddingTop: 5,
        },
        text: {
            color: isDark ? "white" : "black",
        }
    });
    return (
        <ScrollView contentContainerStyle={{ alignItems: "center", flexGrow: rooms.length === 0 ? 1 : undefined, justifyContent: rooms.length === 0 ? "center" : undefined }} style={styles.container}>
            {
                rooms.length === 0 ?
                    <Text style={styles.text}>No Room Available!</Text> :
                    rooms.map((room, index) => {
                        return <RoomInfo isDark={isDark} hostName={room.host.name} hostPlayer={room.guest.player === "O" ? "X" : "O"} roomId={room.id} key={index} />
                    })
            }
        </ScrollView>
    )
}

export default Rooms