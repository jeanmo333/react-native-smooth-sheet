import React, { useEffect, useRef, useImperativeHandle, forwardRef, } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, View, TouchableWithoutFeedback, } from 'react-native';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SmoothSheet = forwardRef(({ isVisible, onClose, snapPoint = 0.25, children }, ref) => {
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;
    const currentSnapYRef = useRef(SCREEN_HEIGHT * (1 - snapPoint));
    // Actualiza el snap actual cuando cambia el snapPoint
    useEffect(() => {
        const newSnapY = SCREEN_HEIGHT * (1 - snapPoint);
        currentSnapYRef.current = newSnapY;
        if (isVisible) {
            Animated.timing(translateY, {
                toValue: newSnapY,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [snapPoint]);
    useImperativeHandle(ref, () => ({
        close: () => closeSheet(),
    }));
    const panResponder = useRef(PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
        onPanResponderMove: (_, gestureState) => {
            if (gestureState.dy > 0) {
                translateY.setValue(currentSnapYRef.current + gestureState.dy);
            }
        },
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dy > 100) {
                closeSheet();
            }
            else {
                openSheet();
            }
        },
    })).current;
    const openSheet = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: currentSnapYRef.current,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
                toValue: 0.4,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };
    const closeSheet = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: SCREEN_HEIGHT,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(backdropOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onClose(); // Solo se cierra luego de animación
        });
    };
    useEffect(() => {
        if (isVisible) {
            openSheet();
        }
        else {
            closeSheet();
        }
    }, [isVisible]);
    if (!isVisible)
        return null;
    return (React.createElement(View, { style: StyleSheet.absoluteFill },
        React.createElement(TouchableWithoutFeedback, { onPress: closeSheet },
            React.createElement(Animated.View, { style: [
                    StyleSheet.absoluteFill,
                    {
                        backgroundColor: 'black',
                        opacity: backdropOpacity,
                    },
                ] })),
        React.createElement(Animated.View, { style: [
                styles.sheet,
                {
                    transform: [{ translateY }],
                },
            ], ...panResponder.panHandlers },
            React.createElement(View, { style: styles.handle }),
            React.createElement(View, { style: styles.content }, children))));
});
const styles = StyleSheet.create({
    sheet: {
        position: 'absolute',
        bottom: 0,
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
        paddingHorizontal: 20,
        elevation: 10,
    },
    handle: {
        width: 50,
        height: 6,
        backgroundColor: '#ccc',
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 10,
    },
    content: {
        paddingBottom: 20,
    },
});
export default SmoothSheet;
