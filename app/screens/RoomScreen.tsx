import { ParamListBase } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { View, Text, StyleSheet } from "react-native"
import { APP_BG_COLOR_DARK, APP_BG_COLOR_LIGHT } from "../colors";


interface RoomScreenProps extends StackScreenProps<ParamListBase, "Room"> {
    isDark: boolean;
}

function Rooms({ isDark }: RoomScreenProps) {
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
            <Text style={styles.text}>Rooms</Text>
        </View>
    )
}

export default Rooms