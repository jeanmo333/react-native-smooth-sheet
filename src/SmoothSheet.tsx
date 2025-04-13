import React, {
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
    ReactNode,
  } from 'react';
  import {
    Animated,
    Dimensions,
    PanResponder,
    StyleSheet,
    View,
    TouchableWithoutFeedback,
  } from 'react-native';
  
  const {height: SCREEN_HEIGHT} = Dimensions.get('window');
  
  export type SmoothSheetRef = {
    close: () => void;
  };
  
  type Props = {
    isVisible: boolean;
    onClose: () => void;
    snapPoint?: number; // Entre 0.25 y 1
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    paddingHorizontal?: number;
    children: ReactNode;
  };
  
  const SmoothSheet = forwardRef<SmoothSheetRef, Props>(
    (
      {
        isVisible,
        onClose,
        snapPoint = 0.25,
        children,
        borderTopLeftRadius = 20,
        borderTopRightRadius = 20,
        paddingHorizontal = 15,
      },
      ref,
    ) => {
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
  
      const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: (_, gestureState) =>
            Math.abs(gestureState.dy) > 5,
          onPanResponderMove: (_, gestureState) => {
            if (gestureState.dy > 0) {
              translateY.setValue(currentSnapYRef.current + gestureState.dy);
            }
          },
          onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dy > 100) {
              closeSheet();
            } else {
              openSheet();
            }
          },
        }),
      ).current;
  
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
        } else {
          closeSheet();
        }
      }, [isVisible]);
  
      if (!isVisible) return null;
  
      return (
        <View style={StyleSheet.absoluteFill}>
          {/* BACKDROP */}
          <TouchableWithoutFeedback onPress={closeSheet}>
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: 'black',
                  opacity: backdropOpacity,
                },
              ]}
            />
          </TouchableWithoutFeedback>
  
          {/* SHEET */}
          <Animated.View
            style={[
              styles.sheet,
              {
                transform: [{translateY}],
                borderTopLeftRadius,
                borderTopRightRadius,
                paddingHorizontal,
              },
            ]}
            {...panResponder.panHandlers}>
            <View style={styles.handle} />
            <View style={styles.content}>{children}</View>
          </Animated.View>
        </View>
      );
    },
  );
  
  const styles = StyleSheet.create({
    sheet: {
      position: 'absolute',
      bottom: 0,
      height: SCREEN_HEIGHT,
      width: '100%',
      backgroundColor: '#fff',
      paddingTop: 10,
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
  