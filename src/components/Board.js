import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Cell from './Cell';
import {
    initBoardData,
    revealEmpty,
    getHidden,
    getMines,
    getFlags,
} from '../helpers/board-helpers.js';
import PopUp from './PopUp';

const config = {
    height: 9,
    width: 9,
    mines: 10,
};

const Board = () => {
    const initialState = {
        boardData: initBoardData(config.height, config.width, config.mines),
        gameStatus: '',
        mineCount: config.mines,
    };

    const [state, setState] = useState(initialState);

    const [modalVsible, setModal] = useState(false);

    // modal pops up when game status changes
    useEffect(() => {
        state.gameStatus ? setModal(true) : null;
    }, [state.gameStatus]);

    // game reset
    const retry = () => {
        setModal(false);
        setState(initialState);
    };

    // Game over, reveals the whole board
    const revealBoard = result => {
        let newBoardData = state.boardData;
        newBoardData.map(row => {
            row.map(item => {
                item.isRevealed = true;
            });
        });
        setState({ ...state, boardData: newBoardData, gameStatus: result });
    };

    const handleCellClick = (x, y) => {
        if (state.boardData[x][y].isMine) {
            return revealBoard('You Lost.');
        }

        let newBoardData = state.boardData;
        newBoardData[x][y].isFlagged = false;
        newBoardData[x][y].isRevealed = true;

        if (newBoardData[x][y].isEmpty) {
            newBoardData = revealEmpty(
                x,
                y,
                newBoardData,
                config.height,
                config.width
            );
        }

        if (getHidden(newBoardData).length === config.mines) {
            return revealBoard('You Won!');
        }

        setState({ ...state, boardData: newBoardData });
    };

    const handleLongPress = (x, y) => {
        let newBoardData = state.boardData;
        let mines = state.mineCount;

        if (newBoardData[x][y].isFlagged) {
            newBoardData[x][y].isFlagged = false;
            mines++;
        } else {
            newBoardData[x][y].isFlagged = true;
            mines--;
        }

        if (mines === 0) {
            const mineArray = getMines(newBoardData);
            const FlagArray = getFlags(newBoardData);
            if (JSON.stringify(mineArray) === JSON.stringify(FlagArray)) {
                return revealBoard('You Won!');
            }
        }

        setState({ ...state, boardData: newBoardData, mineCount: mines });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Minesweeper</Text>
            <Text style={styles.tipText}>
                Mines remaining: {state.mineCount}
            </Text>
            <View style={styles.board}>
                {state.boardData.map(row =>
                    row.map(item => (
                        <View key={item.x * row.length + item.y}>
                            <Cell
                                onClick={() => handleCellClick(item.x, item.y)}
                                onLongPress={e =>
                                    handleLongPress(item.x, item.y)
                                }
                                value={item}
                            />
                        </View>
                    ))
                )}
                <Text style={styles.tipText}>
                    Long press to leave or remove a 🚩
                </Text>
                <PopUp
                    modalVsible={modalVsible}
                    close={retry}
                    gameStatus={state.gameStatus}
                />
            </View>
        </View>
    );
};

export default Board;

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
    },
    board: {
        marginTop: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    tipText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 15,
    },
    titleText: {
        flex: 1,
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
