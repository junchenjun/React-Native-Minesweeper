import React from 'react';
import { View, StatusBar } from 'react-native';
import Board from './components/Board';

const App = () => (
    <View>
        <StatusBar barStyle="dark-content" hidden={false} />
        <Board />
    </View>
);

export default App;
