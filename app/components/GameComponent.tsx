import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native'
import { APP_BG_COLOR_DARK, APP_BG_COLOR_LIGHT } from '../colors';

interface GameComponentProps {
    isDark: boolean;
    navigation: StackNavigationProp<ParamListBase, "Home", undefined>;
}

const GameComponent = ({ isDark }: GameComponentProps) => {
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
            <Text style={styles.text}>GameComponent</Text>
        </View>
    )
}

export default GameComponent