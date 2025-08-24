import React from 'react';
import { ActivityIndicator, Pressable, Text, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

export type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

export function Button({ title, onPress, disabled, loading, style }: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [{
        backgroundColor: isDisabled ? '#9CC5E4' : colors.primary,
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: 12,
        opacity: pressed ? 0.9 : 1,
      }, style]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 18 }}>{title}</Text>
      )}
    </Pressable>
  );
}