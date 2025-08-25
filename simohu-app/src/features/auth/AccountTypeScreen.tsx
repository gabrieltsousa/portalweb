import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'AccountType'>;

export function AccountTypeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ alignItems: 'center', paddingTop: 48 }}>
          <Image
            source={require('../../../assets/facil-alagoas-vetorizada-colorida.png')}
            style={{ width: 140, height: 40, resizeMode: 'contain' }}
          />
        </View>

        <View style={{ paddingHorizontal: 16, marginTop: 24, alignItems: 'center' }}>
          <Text style={{ color: colors.textSecondary, fontSize: 24, textAlign: 'center' }}>Você é uma
            <Text style={{ color: colors.primary, fontWeight: '800' }}>{' '}pessoa</Text> ou uma
            <Text style={{ color: '#E53935', fontWeight: '800' }}>{' '}empresa?</Text>
          </Text>
          <Text style={{ color: colors.textSecondary, marginTop: 16, textAlign: 'center' }}>
            Selecione uma opção para continuarmos com seu cadastro
          </Text>

          <View style={{ height: 24 }} />
          <Button title="Pessoa Física" onPress={() => navigation.navigate('Register')} />
          <View style={{ height: 12 }} />
          <Button title="Pessoa Jurídica" onPress={() => navigation.navigate('Register')} style={{ backgroundColor: '#DFE7EE' as any }} />
        </View>

        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Text style={{ color: colors.textSecondary, fontSize: 12 }}>© 2024 Fácil Alagoas. Todos os direitos reservados</Text>
          <View style={{ height: 6 }} />
          <Text style={{ color: colors.textSecondary, fontSize: 12 }}>SIMOHU Versão 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

