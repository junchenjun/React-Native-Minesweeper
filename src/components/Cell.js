import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const Cell = props => {
    const { value, onClick, onLongPress } = props;

    const getValue = () => {
        if (!value.isRevealed) {
            return value.isFlagged ? '🚩' : '';
        }
        if (value.isMine) {
            return 'X';
        }
        if (value.neighbour === 0) {
            return '';
        }
        return value.neighbour.toString();
    };

    return (
        <TouchableWithoutFeedback
            onPress={value.isRevealed || value.isFlagged ? null : onClick}
            onLongPress={value.isRevealed ? null : onLongPress}
        >
            <View
                style={
                    value.isRevealed
                        ? value.isMine
                            ? styles.mineRevealed
                            : styles.cellRevealed
                        : styles.cellUnrevealed
                }
            >
                <Text style={styles.cellText}>{getValue()}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Cell;

const cellStyle = {
    width: windowWidth / 8 - 9,
    height: windowWidth / 8 - 9,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1.5,
    margin: 1,
};

const styles = StyleSheet.create({
    cellUnrevealed: {
        ...cellStyle,
        backgroundColor: 'white',
    },
    mineRevealed: {
        ...cellStyle,
        backgroundColor: 'orange',
    },
    cellRevealed: {
        ...cellStyle,
        backgroundColor: 'skyblue',
    },
    cellText: {
        textAlign: 'center',
        fontSize: 20,
    },
});
