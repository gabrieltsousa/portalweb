import React from 'react';
import { Image, ImageSourcePropType, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const logo: ImageSourcePropType = require('../../../assets/facil-alagoas-vetorizada-colorida.png');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ alignItems: 'center', paddingTop: 48 }}>
          <Image
            source={logo}
            style={{ width: 140, height: 40, resizeMode: 'contain' }}
          />
        </View>

        <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
          <View style={{ backgroundColor: '#F88407', borderRadius: 8, paddingVertical: 18, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16, flex: 1, textAlign: 'center' }}>
              Empresas (Pessoa Jurídica) - Retornar ao Portal Antigo
            </Text>
          </View>

          <View style={{ marginTop: 36, alignItems: 'center' }}>
            <Text style={{ color: colors.textSecondary, fontSize: 24 }}>Bem-vindo ao</Text>
            <Text style={{ color: colors.text, fontWeight: '800', fontSize: 28, marginTop: 4 }}>
              Portal Fácil Alagoas
            </Text>
            <Text style={{ color: colors.textSecondary, marginTop: 16, textAlign: 'center' }}>
              Acesse o portal usando suas credenciais e faça login.
              Se ainda não possui conta. Cadastre-se agora.
            </Text>
          </View>

          <View style={{ marginTop: 24 }}>
            <Button title="Faça Login" onPress={() => navigation.navigate('Login')} />
            <View style={{ height: 12 }} />
            <Button title="Cadastre-se" onPress={() => navigation.navigate('AccountType')} style={{ backgroundColor: '#DFE7EE' as any }} />
          </View>
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

