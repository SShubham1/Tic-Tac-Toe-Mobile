import { View, Text, StyleSheet, Button } from 'react-native'
import { SvgXml } from 'react-native-svg';
import { oSvg } from '../o';
import { xSvg } from '../x';

interface RoomInfoProps {
    isDark: boolean;
    hostName: string;
    hostPlayer: 'X' | 'O';
    roomId: "string";
}

const RoomInfo = ({ isDark, hostName, hostPlayer, roomId }: RoomInfoProps) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: isDark ? "purple" : "lightblue",
            width: "99%",
            padding: 10
        },
        text: {
            color: isDark ? "white" : "black",
        }
    })

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>Host: </Text>
                        <Text style={styles.text}>{hostName}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={[styles.text, { fontWeight: "bold", textAlignVertical: "center" }]}>Host Player: </Text>
                        <SvgXml xml={hostPlayer ? xSvg : oSvg} height={40} />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={[styles.text, { fontWeight: "bold" }]}>Room Id: </Text>
                        <Text style={styles.text}>{roomId}</Text>
                    </View>
                </View>
                <View style={{ alignSelf: "center" }}>
                    <Button title={"Join"} />
                </View>
            </View>
        </View>
    )
}

export default RoomInfo