import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View, Alert, Linking } from 'react-native';
import { TabToggle } from '../../components/TabToggle';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { colors } from '../../theme/colors';
import { AuthService } from '../../services/auth.service';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().min(1, 'Informe o email').email('Email inválido'),
  senha: z.string().min(1, 'Informe a senha'),
});

type FormValues = z.infer<typeof schema>;

export function LoginScreen() {
  const [tab, setTab] = useState<'left' | 'right'>('left'); // left=PF, right=PJ
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState, register, setValue, getValues } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', senha: '' },
    mode: 'onTouched',
  });

  // Register fields for uncontrolled TextInput usage
  React.useEffect(() => {
    register('email');
    register('senha');
  }, [register]);

  const onLogin = async () => {
    const values = getValues();
    const parse = schema.safeParse(values);
    if (!parse.success) {
      // Trigger errors by touching fields
      Alert.alert('Campos inválidos', 'Preencha os campos corretamente.');
      return;
    }

    setLoading(true);
    try {
      const tipo = tab === 'left' ? 1 : 2;
      const data = await AuthService.login({ login: values.email, senha: values.senha, tipo: tipo as 1 | 2 });
      Alert.alert('Sucesso', 'Login realizado com sucesso');
      // TODO: navigate to home once available
    } catch (e: any) {
      const message = e?.message || 'Erro ao efetuar login';
      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={{ backgroundColor: colors.primary, paddingBottom: 24, paddingTop: 24, alignItems: 'center' }}>
            {/* Logo placeholder intentionally omitted */}
          </View>

          <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 24 }}>
            <TabToggle
              leftLabel="Pessoa Física"
              rightLabel="Pessoa Jurídica"
              value={tab}
              onChange={setTab}
            />

            <View style={{ height: 16 }} />

            <TextField
              label="Email"
              placeholder="exemplo@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(t) => setValue('email', t, { shouldValidate: true })}
              errorText={formState.errors.email?.message}
            />

            <TextField
              label="Senha"
              placeholder="Senha"
              secure
              onChangeText={(t) => setValue('senha', t, { shouldValidate: true })}
              errorText={formState.errors.senha?.message}
            />

            <Button title="Login" onPress={handleSubmit(onLogin)} loading={loading} />

            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ color: colors.textSecondary }}>
                Não tem conta? <Text style={{ fontWeight: '700', color: colors.text }}>Cadastrar</Text>
              </Text>
              <View style={{ height: 8 }} />
              <Text style={{ color: colors.textSecondary }}>Esqueceu a senha?</Text>
            </View>

            <View style={{ alignItems: 'center', marginTop: 32 }}>
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
                © 2024 Fácil Alagoas. Todos os direitos reservados
              </Text>
              <View style={{ height: 8 }} />
              <Text style={{ color: colors.textSecondary, fontSize: 12 }}>SIMOHU Versão 1.0.0</Text>
              <View style={{ height: 12 }} />
              <Text
                style={{ color: colors.textSecondary, textDecorationLine: 'underline', fontSize: 12 }}
                onPress={() => Linking.openURL('https://portalweb.facialalagoas.com.br')}
              >
                portalweb.facialalagoas.com.br — Privado
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}