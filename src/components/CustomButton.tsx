import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import colors from '../assets/colors';
import HapticFeedback from 'react-native-haptic-feedback';

interface ButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  backgroundColor = colors.primary,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: opacity.value,
  }));

  const handlePress = () => {
    HapticFeedback.trigger('impactLight'); // Light vibration feedback
    onPress();
  };

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withSpring(0.95);
        opacity.value = withTiming(0.8, {duration: 100});
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
        opacity.value = withTiming(1, {duration: 100});
      }}
      onPress={handlePress}
      android_ripple={{color: colors.textSecondary, borderless: false}} // Ripple effect for Android
    >
      <Animated.View style={[styles.buttonContainer, animatedStyle]}>
        <Button
          mode="contained"
          style={[styles.button, {backgroundColor}]}
          onPress={handlePress}>
          {title}
        </Button>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 8,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
  },
});

export default CustomButton;
