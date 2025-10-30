import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import type { ReactNode } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export type SmoothSheetRef = {
  close: () => void;
};

type Props = {
  isVisible: boolean;
  onClose: () => void;
  snapPoint?: number;
  maxTopSnapPoint?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  paddingHorizontal?: number;
  theme?: string;
  disableDrag?: boolean;
  flattenOnFullOpen?: boolean;
  dragIndicatorColor?: string;
  children: ReactNode;
};

const SmoothSheet = forwardRef<SmoothSheetRef, Props>(
  (
    {
      isVisible,
      onClose,
      snapPoint = 0.25,
      maxTopSnapPoint = 0,
      children,
      borderTopLeftRadius = 20,
      borderTopRightRadius = 20,
      paddingHorizontal = 15,
      theme = '#fff',
      disableDrag = false,
      flattenOnFullOpen = false,
      dragIndicatorColor,
    },
    ref
  ) => {
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const backdropOpacity = useRef(new Animated.Value(0)).current;
    const currentOffset = useRef(SCREEN_HEIGHT * (1 - snapPoint));
    const isDark = theme !== '#fff';

    const borderTopLeftAnim = flattenOnFullOpen
      ? translateY.interpolate({
          inputRange: [0, SCREEN_HEIGHT],
          outputRange: [0, borderTopLeftRadius],
          extrapolate: 'clamp',
        })
      : new Animated.Value(borderTopLeftRadius);

    const borderTopRightAnim = flattenOnFullOpen
      ? translateY.interpolate({
          inputRange: [0, SCREEN_HEIGHT],
          outputRange: [0, borderTopRightRadius],
          extrapolate: 'clamp',
        })
      : new Animated.Value(borderTopRightRadius);

    useImperativeHandle(ref, () => ({
      close: () => closeSheet(),
    }));

    const openSheet = () => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: currentOffset.current,
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
        onClose();
      });
    };

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          !disableDrag && Math.abs(gestureState.dy) > 5,
        onPanResponderMove: (_, gestureState) => {
          if (!disableDrag) {
            const rawY = currentOffset.current + gestureState.dy;

            const minY = maxTopSnapPoint
              ? SCREEN_HEIGHT * (1 - maxTopSnapPoint)
              : 0;

            const newY = Math.max(minY, rawY);
            translateY.setValue(newY);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          if (!disableDrag) {
            translateY.stopAnimation((val) => {
              const newOffset = val;
              const shouldClose =
                gestureState.dy > 100 || newOffset > SCREEN_HEIGHT * 0.75;

              if (shouldClose) {
                closeSheet();
              } else {
                currentOffset.current = newOffset;
              }
            });
          }
        },
      })
    ).current;

    useEffect(() => {
      if (isVisible) {
        currentOffset.current = SCREEN_HEIGHT * (1 - snapPoint);
        openSheet();
      }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
      <View style={StyleSheet.absoluteFill}>
        <TouchableWithoutFeedback onPress={() => !disableDrag && closeSheet()}>
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

        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [{ translateY }],
              backgroundColor: theme,
              borderTopLeftRadius: borderTopLeftAnim,
              borderTopRightRadius: borderTopRightAnim,
              paddingHorizontal,
            },
          ]}
        >
          <View
            style={styles.dragArea}
            {...(!disableDrag ? panResponder.panHandlers : {})}
          >
            <View
              style={[
                styles.handle,
                {
                  backgroundColor: dragIndicatorColor
                    ? dragIndicatorColor
                    : isDark
                      ? '#666'
                      : '#ccc',
                },
              ]}
            />
          </View>
          <SafeAreaView style={styles.content}>
            <View>{children}</View>
          </SafeAreaView>
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    bottom: 0,
    height: SCREEN_HEIGHT,
    width: '100%',
    paddingTop: 10,
    elevation: 10,
  },
  dragArea: {
    paddingBottom: 15,
    paddingTop: 5,
    alignItems: 'center'
  },
  handle: {
    width: 50,
    height: 6,
    alignSelf: 'center',
    borderRadius: 10,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
  },
  scrollContent: {
    paddingBottom: 40,
    paddingTop: 10,
  },
});

export default SmoothSheet;
