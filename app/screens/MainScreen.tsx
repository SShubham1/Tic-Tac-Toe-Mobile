import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import GameComponent from '../components/GameComponent';
import HomeComponent from '../components/HomeComponent';

interface MainScreenProps extends StackScreenProps<ParamListBase, "Home"> {
    isDark: boolean;
    setIsGame: React.Dispatch<React.SetStateAction<boolean>>;
    isGame: boolean;
}

function MainScreen({ isDark, navigation, route, setIsGame, isGame }: MainScreenProps) {
    const [player, setPlayer] = React.useState(('X' as 'X' | 'O'));
    const [room, setRoom] = React.useState((undefined as string | undefined));
    const [playerName, setPlayerName] = React.useState("");
    return (<>
        {
            !isGame ?
                <HomeComponent isDark={isDark} setPlayer={setPlayer} setPlayerName={setPlayerName}
                    playerName={playerName} setRoom={setRoom} room={room}
                    setIsGame={setIsGame} player={player} navigation={navigation} /> :
                <GameComponent roomId={room} xName={player === "X" ? playerName : undefined} oName={player === "O" ? playerName : undefined}
                    oScore={0} xScore={0} drawScore={0} setPlayerName={setPlayerName}
                    setIsGame={setIsGame} route={route} player={player} isDark={isDark} navigation={navigation} />
        }
    </>)
}


export default MainScreen
