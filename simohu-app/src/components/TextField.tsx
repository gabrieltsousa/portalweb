import React, { useState } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '../theme/colors';

export type TextFieldProps = TextInputProps & {
  label: string;
  secure?: boolean;
  errorText?: string;
};

export function TextField({ label, secure, errorText, style, ...rest }: TextFieldProps) {
  const [isSecure, setIsSecure] = useState(!!secure);

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 8, color: colors.text, fontWeight: '700' }}>{label}</Text>
      <View style={{
        backgroundColor: colors.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}>
        <TextInput
          style={[{ flex: 1, height: 52, fontSize: 16 }, style as any]}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={isSecure}
          {...rest}
        />
        {secure && (
          <Pressable onPress={() => setIsSecure(v => !v)}
            accessibilityLabel={isSecure ? 'Mostrar senha' : 'Ocultar senha'}
          >
            <Text style={{ color: colors.textSecondary, fontSize: 16 }}>
              {isSecure ? '👁️‍🗨️' : '🙈'}
            </Text>
          </Pressable>
        )}
      </View>
      {!!errorText && (
        <Text style={{ marginTop: 6, color: colors.danger }}>{errorText}</Text>
      )}
    </View>
  );
}