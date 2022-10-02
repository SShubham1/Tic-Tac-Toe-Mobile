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
    const [isGame, setIsGame] = React.useState(false);
    const [playerName, setPlayerName] = React.useState("");
    const [player, setPlayer] = React.useState(('X' as 'X' | 'O'));
    const [room, setRoom] = React.useState((undefined as string | undefined));

    return (<>
        {
            !isGame ?
                <HomeComponent isDark={isDark} setPlayer={setPlayer} setPlayerName={setPlayerName}
                    playerName={playerName} setRoom={setRoom} room={room}
                    setIsGame={setIsGame} player={player} navigation={navigation} /> :
                <GameComponent xName={player === "X" ? playerName : undefined} oName={player === "O" ? playerName : undefined}
                    oScore={0} xScore={0} drawScore={0} setPlayerName={setPlayerName}
                    setIsGame={setIsGame} player={player} isDark={isDark} navigation={navigation} />
        }
    </>)
}


export default MainScreen
