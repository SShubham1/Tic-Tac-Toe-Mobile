import { HeaderBackButtonProps } from '@react-navigation/elements';
import { Image } from 'react-native'
export default function ActionBarIcon({ }: HeaderBackButtonProps) {
    return (
        <Image
            source={require("../assets/favicon.png")}
            style={{ width: 40, height: 40, marginLeft: 15 }} />
    );
}
