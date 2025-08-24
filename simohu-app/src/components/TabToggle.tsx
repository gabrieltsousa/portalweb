import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export type TabToggleProps = {
  leftLabel: string;
  rightLabel: string;
  value: 'left' | 'right';
  onChange: (value: 'left' | 'right') => void;
};

export function TabToggle({ leftLabel, rightLabel, value, onChange }: TabToggleProps) {
  const baseStyle = {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center' as const,
    borderRadius: 12,
  };

  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#DFE7EE', borderRadius: 16, padding: 6 }}>
      <Pressable onPress={() => onChange('left')} style={({ pressed }) => [
        baseStyle,
        { backgroundColor: value === 'left' ? colors.primary : 'transparent', opacity: pressed ? 0.9 : 1 }
      ]}>
        <Text style={{ color: value === 'left' ? '#fff' : colors.text, fontWeight: '700' }}>{leftLabel}</Text>
      </Pressable>
      <Pressable onPress={() => onChange('right')} style={({ pressed }) => [
        baseStyle,
        { backgroundColor: value === 'right' ? colors.primary : 'transparent', opacity: pressed ? 0.9 : 1 }
      ]}>
        <Text style={{ color: value === 'right' ? '#fff' : colors.text, fontWeight: '700' }}>{rightLabel}</Text>
      </Pressable>
    </View>
  );
}