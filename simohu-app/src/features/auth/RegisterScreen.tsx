import React from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={{ backgroundColor: colors.primary, paddingBottom: 24, paddingTop: 32, alignItems: 'center' }}>
            <Image
              source={require('../../../assets/facil-alagoas-vetorizada-positivo.png')}
              style={{ width: 140, height: 40, resizeMode: 'contain' }}
            />
          </View>

          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <Text style={{ fontWeight: '800', fontSize: 18, color: colors.text }}>Criar nova conta</Text>
            <Text style={{ color: colors.textSecondary, marginTop: 2 }}>Preencha o formulário para se cadastrar</Text>

            <View style={{ height: 16 }} />

            <TextField label="Nome Completo" placeholder="Digite seu nome completo" />
            <TextField label="CPF" placeholder="Digite seu CPF" keyboardType="number-pad" />
            <TextField label="Data de Nascimento" placeholder="dd/mm/aaaa" keyboardType="number-pad" />
            <TextField label="Email" placeholder="exemplo@gmail.com" keyboardType="email-address" />
            <TextField label="Telefone Fixo" placeholder="(00) 0000-0000" keyboardType="phone-pad" />
            <TextField label="Celular" placeholder="(00) 00000-0000" keyboardType="phone-pad" />
            <TextField label="Sexo" placeholder="Selecione" />
            <TextField label="Senha" placeholder="****" secure />
            <TextField label="Confirmar Senha" placeholder="****" secure />

            <Button title="Próximo" onPress={() => {}} />
            <View style={{ height: 24 }} />
          </View>

          <View style={{ alignItems: 'center', marginTop: 8, marginBottom: 24 }}>
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>© 2024 Fácil Alagoas. Todos os direitos reservados</Text>
            <View style={{ height: 6 }} />
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>SIMOHU Versão 1.0.0</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

