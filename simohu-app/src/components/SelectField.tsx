import React, { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export type SelectOption<TValue> = {
  label: string;
  value: TValue;
};

type SelectFieldProps<TValue> = {
  label: string;
  placeholder?: string;
  value?: TValue;
  onChange: (value: TValue) => void;
  options: Array<SelectOption<TValue>>;
  errorText?: string;
};

export function SelectField<TValue extends string | number>({
  label,
  placeholder = 'Selecione',
  value,
  onChange,
  options,
  errorText,
}: SelectFieldProps<TValue>) {
  const [visible, setVisible] = useState(false);

  const selectedLabel = useMemo(() => {
    const found = options.find((o) => o.value === value);
    return found?.label ?? '';
  }, [options, value]);

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 8, color: colors.text, fontWeight: '700' }}>{label}</Text>
      <Pressable
        onPress={() => setVisible(true)}
        accessibilityRole="button"
        style={{
          backgroundColor: colors.surface,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          height: 52,
        }}
      >
        <Text style={{ flex: 1, color: selectedLabel ? colors.text : colors.textSecondary, fontSize: 16 }}>
          {selectedLabel || placeholder}
        </Text>
        <Text style={{ color: colors.textSecondary, fontSize: 16 }}>▾</Text>
      </Pressable>

      {!!errorText && (
        <Text style={{ marginTop: 6, color: colors.danger }}>{errorText}</Text>
      )}

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          onPress={() => setVisible(false)}
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', paddingHorizontal: 16 }}
        >
          <Pressable
            style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              paddingVertical: 8,
              maxHeight: 360,
            }}
          >
            <ScrollView>
              {options.map((opt) => (
                <Pressable
                  key={String(opt.value)}
                  onPress={() => {
                    onChange(opt.value);
                    setVisible(false);
                  }}
                  style={{ paddingHorizontal: 16, paddingVertical: 14 }}
                >
                  <Text style={{ color: colors.text, fontSize: 16 }}>{opt.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

