import React, { useEffect } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Modal,
    Easing,
    Dimensions,
} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const popUpWidth = Dimensions.get('window').width * 0.65;

const PopUp = props => {
    const { gameStatus, modalVsible, close } = props;

    const scale = new Animated.Value(0.8);
    const moveUp = new Animated.Value(0);

    useEffect(() => {
        const easeOut = Easing.bezier(0, 0, 0.58, 1);
        Animated.sequence([
            // EaseOut, 1s duration, from bottom of the screen to the center
            Animated.timing(moveUp, {
                toValue: -(windowHeight / 2 - popUpWidth / 2),
                duration: 1000,
                easing: easeOut,
            }),
            // scale up (1.4)
            Animated.timing(scale, {
                toValue: 1.4,
                duration: 500,
                easing: easeOut,
            }),
            // scale down (1)
            Animated.timing(scale, {
                toValue: 1,
                duration: 500,
                easing: easeOut,
            }),
        ]).start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalVsible]);

    return (
        <Modal transparent={true} visible={modalVsible}>
            <View style={styles.popUpContainer}>
                <Animated.View
                    style={{
                        ...styles.content,
                        transform: [{ scale: scale }],
                        top: moveUp,
                    }}
                >
                    <Text style={styles.title}>{gameStatus}</Text>
                    <TouchableWithoutFeedback onPress={close}>
                        <Text style={styles.buttonText}>Retry</Text>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default PopUp;

const styles = StyleSheet.create({
    popUpContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
    },
    content: {
        height: popUpWidth,
        backgroundColor: 'snow',
        width: popUpWidth,
        padding: 6,
        borderRadius: 20,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
    },
    buttonText: {
        paddingTop: 10,
        color: 'orange',
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});
