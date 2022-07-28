import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useImperativeHandle } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Tags from '../components/ProductInner/Tags';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 350;
const MIN_TRANSLATE_Y = SCREEN_HEIGHT - 470;

type BottomSheetProps = {
  children?: React.ReactNode; 
  onUpdate: (translateY: number) => void
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({ children, onUpdate }, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

    const scrollTo = useCallback((destination: number) => {
      'worklet';
      active.value = destination !== 0;

      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);


    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
            translateY.value = event.translationY + context.value.y;
            translateY.value = Math.min(Math.max(translateY.value, MAX_TRANSLATE_Y), 0) ;
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 4) {
          scrollTo(0);
        } else {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {

      return {
        transform: [{ translateY: translateY.value }],
      };
    });

    const rBottomSheetInnerStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
          translateY.value,
          [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
          [25, 5],
          Extrapolate.CLAMP
        );
  
        return {
          borderRadius,
        };
      });

    const tagStyles = useAnimatedStyle(() => {
        const scale = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
            [1, 0.5],
            Extrapolate.CLAMP
          );

        const translate = interpolate(
            translateY.value,
            [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
            [0, 60],
            Extrapolate.CLAMP
        );
                
        return {
            transform: [{ scale }, {translateY: translate}],
        }
    });


    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
            <Tags itemStyle={tagStyles}/>
          <Animated.View style={[styles.bottomSheetInner, rBottomSheetInnerStyle]}>
            <View style={styles.line} />
            {children}
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    position: 'absolute',
    top: SCREEN_HEIGHT - 310,
    overflow: 'hidden'
  },
  bottomSheetInner: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 25,
    flex: 1
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default BottomSheet;