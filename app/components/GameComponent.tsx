import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableNativeFeedback, ScrollView } from 'react-native'
import { SvgXml } from 'react-native-svg';
import { APP_BG_COLOR_DARK, APP_BG_COLOR_LIGHT } from '../colors';
import { drawSvg } from '../draw';
import { oSvg } from '../o';
import { xSvg } from '../x';

interface GameComponentProps {
    isDark: boolean;
    navigation: StackNavigationProp<ParamListBase, "Home", undefined>;
    setIsGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameComponent = ({ isDark, setIsGame }: GameComponentProps) => {
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
    return (
        <ScrollView contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
        }} style={styles.container}>
            <Text style={[styles.text, { fontSize: 30, fontWeight: "bold" }]}>Room ID: </Text>
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
                        <SvgXml xml={xSvg} />
                        <Text style={[styles.text, { fontSize: 20, textAlignVertical: "center" }]}>: 0</Text>
                    </View>
                    <Text style={[styles.text, { fontSize: 20, textAlign: "center" }]}>XName</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <SvgXml xml={drawSvg} width={80} />
                    <Text style={[styles.text, { fontSize: 20, textAlignVertical: "center" }]}>: 0</Text>
                </View>
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <SvgXml xml={oSvg} />
                        <Text style={[styles.text, { fontSize: 20, textAlignVertical: "center" }]}>: 0</Text>
                    </View>
                    <Text style={[styles.text, { fontSize: 20, textAlign: "center" }]}>OName</Text>
                </View>
            </View>
            <Text style={[styles.text, { fontSize: 18, fontWeight: "500" }]}>Waiting for player to join the Game...</Text>
            <TouchableNativeFeedback onPress={() => setIsGame(false)}>
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