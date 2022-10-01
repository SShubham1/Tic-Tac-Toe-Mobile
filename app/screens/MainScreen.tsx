import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react'
import { Socket } from 'socket.io-client';
import DefaultEventsMap from 'socket.io-client'
import GameComponent from '../components/GameComponent';
import HomeComponent from '../components/HomeComponent';

interface MainScreenProps {
    isDark: boolean;
    navigation: StackNavigationProp<ParamListBase, "Home", undefined>;
    socketRef: React.MutableRefObject<Socket<typeof DefaultEventsMap, typeof DefaultEventsMap>>;
}

function MainScreen({ isDark, navigation, socketRef }: MainScreenProps) {
    const [isGame, setIsGame] = React.useState(false);
    const [playerName, setPlayerName] = React.useState("");
    const [player, setPlayer] = React.useState(('X' as 'X' | 'O'));
    const [room, setRoom] = React.useState("");

    return (<>
        {
            !isGame ?
                <HomeComponent isDark={isDark} setPlayer={setPlayer} setPlayerName={setPlayerName}
                    playerName={playerName} setRoom={setRoom} room={room} socketRef={socketRef}
                    setIsGame={setIsGame} player={player} navigation={navigation} /> :
                <GameComponent xName='XName' oName='OName' oScore={0} xScore={0} drawScore={0} roomId={"string"} setIsGame={setIsGame} isDark={isDark} navigation={navigation} />
        }
    </>)
}


export default MainScreen
