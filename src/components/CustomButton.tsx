import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import colors from '../assets/colors';

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

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.95))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}>
      <Animated.View style={[styles.buttonContainer, animatedStyle]}>
        <Button
          mode="contained"
          style={[styles.button, {backgroundColor}]}
          onPress={onPress}>
          {title}
        </Button>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 8,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
  },
});

export default CustomButton;
