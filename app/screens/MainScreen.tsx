import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import GameComponent from '../components/GameComponent';
import HomeComponent from '../components/HomeComponent';

interface MainScreenProps {
    isDark: boolean;
    navigation: StackNavigationProp<ParamListBase, "Home", undefined>;
}

function MainScreen({ isDark, navigation }: MainScreenProps) {
    const [isGame, setisGame] = React.useState(false);
    return (<>
        {
            !isGame ?
                <HomeComponent isDark={isDark} navigation={navigation} /> :
                <GameComponent isDark={isDark} navigation={navigation} />
        }
    </>)
}


export default MainScreen
