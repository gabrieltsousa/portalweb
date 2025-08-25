import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../app/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserService } from '../../services/user.service';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const personalSchema = z.object({
  VC_NOME: z.string().min(1, 'Informe o nome completo'),
  VC_CPF: z.string().min(11, 'CPF inválido'),
  DT_NASCIMENTO: z.string().min(10, 'Data inválida'),
  VC_LOGIN: z.string().min(1, 'Informe o email').email('Email inválido'),
  VC_TELRESIDENCIAL: z.string().min(8, 'Telefone inválido').optional().or(z.literal('')),
  VC_CELULAR: z.string().min(9, 'Celular inválido'),
  VC_SEXO: z.string().min(1, 'Informe o sexo'),
  VC_SENHA: z.string().min(6, 'Mínimo 6 caracteres'),
  CONFIRMAR_SENHA: z.string().min(6, 'Mínimo 6 caracteres'),
}).refine((data) => data.VC_SENHA === data.CONFIRMAR_SENHA, {
  path: ['CONFIRMAR_SENHA'],
  message: 'As senhas não conferem',
});

const addressSchema = z.object({
  VC_CEP: z.string().min(8, 'CEP inválido'),
  VC_LOGRADOURO: z.string().min(1, 'Informe o logradouro'),
  NI_NUMERO: z.string().min(1, 'Informe o número'),
  VC_COMPLEMENTO: z.string().optional(),
  VC_BAIRRO: z.string().min(1, 'Informe o bairro'),
  VC_MUNICIPIO: z.string().min(1, 'Informe o município'),
  VC_UF: z.string().length(2, 'UF inválida'),
});

type PersonalValues = z.infer<typeof personalSchema>;
type AddressValues = z.infer<typeof addressSchema>;

export function RegisterScreen({ navigation }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);

  const personalForm = useForm<PersonalValues>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      VC_NOME: '',
      VC_CPF: '',
      DT_NASCIMENTO: '',
      VC_LOGIN: '',
      VC_TELRESIDENCIAL: '',
      VC_CELULAR: '',
      VC_SEXO: '',
      VC_SENHA: '',
      CONFIRMAR_SENHA: '',
    },
    mode: 'onTouched',
  });

  const addressForm = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      VC_CEP: '',
      VC_LOGRADOURO: '',
      NI_NUMERO: '',
      VC_COMPLEMENTO: '',
      VC_BAIRRO: '',
      VC_MUNICIPIO: '',
      VC_UF: '',
    },
    mode: 'onTouched',
  });

  React.useEffect(() => {
    const { register } = personalForm;
    register('VC_NOME');
    register('VC_CPF');
    register('DT_NASCIMENTO');
    register('VC_LOGIN');
    register('VC_TELRESIDENCIAL');
    register('VC_CELULAR');
    register('VC_SEXO');
    register('VC_SENHA');
    register('CONFIRMAR_SENHA');
  }, [personalForm]);

  React.useEffect(() => {
    const { register } = addressForm;
    register('VC_CEP');
    register('VC_LOGRADOURO');
    register('NI_NUMERO');
    register('VC_COMPLEMENTO');
    register('VC_BAIRRO');
    register('VC_MUNICIPIO');
    register('VC_UF');
  }, [addressForm]);

  const goNext = async () => {
    const values = personalForm.getValues();
    const parsed = personalSchema.safeParse(values);
    if (!parsed.success) {
      Alert.alert('Campos inválidos', 'Corrija os campos para prosseguir.');
      return;
    }
    setStep(2);
  };

  const submit = async () => {
    const addrValues = addressForm.getValues();
    const parsedAddr = addressSchema.safeParse(addrValues);
    if (!parsedAddr.success) {
      Alert.alert('Campos inválidos', 'Corrija os campos para prosseguir.');
      return;
    }

    const p = personalForm.getValues();

    setLoading(true);
    try {
      await UserService.create({
        NI_IDPERFIL: 5,
        NI_TIPOUSUARIOPORTAL: 1,
        VC_LOGIN: p.VC_LOGIN,
        VC_NOME: p.VC_NOME,
        VC_SEXO: p.VC_SEXO,
        VC_CPF: p.VC_CPF,
        VC_CELULAR: p.VC_CELULAR,
        VC_TELRESIDENCIAL: p.VC_TELRESIDENCIAL ?? '',
        DT_NASCIMENTO: p.DT_NASCIMENTO,
        VC_CEP: addrValues.VC_CEP,
        VC_LOGRADOURO: addrValues.VC_LOGRADOURO,
        NI_NUMERO: addrValues.NI_NUMERO,
        VC_BAIRRO: addrValues.VC_BAIRRO,
        VC_COMPLEMENTO: addrValues.VC_COMPLEMENTO,
        VC_MUNICIPIO: addrValues.VC_MUNICIPIO,
        VC_UF: addrValues.VC_UF,
        VC_SENHA: p.VC_SENHA,
      });
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso');
      navigation.navigate('Login');
    } catch (e: any) {
      Alert.alert('Erro', e?.message || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };
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

            {step === 1 && (
              <>
                <TextField
                  label="Nome Completo"
                  placeholder="Digite seu nome completo"
                  onChangeText={(t) => personalForm.setValue('VC_NOME', t, { shouldValidate: true })}
                  errorText={personalForm.formState.errors.VC_NOME?.message}
                />
                <TextField
                  label="CPF"
                  placeholder="Digite seu CPF"
                  keyboardType="number-pad"
                  onChangeText={(t) => personalForm.setValue('VC_CPF', t, { shouldValidate: true })}
                  errorText={personalForm.formState.errors.VC_CPF?.message}
                />
                <TextField
                  label="Data de Nascimento"
                  placeholder="dd/mm/aaaa"
                  keyboardType="number-pad"
                  onChangeText={(t) => personalForm.setValue('DT_NASCIMENTO', t, { shouldValidate: true })}
                  errorText={personalForm.formState.errors.DT_NASCIMENTO?.message}
                />
                <TextField
                  label="Email"
                  placeholder="exemplo@gmail.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(t) => personalForm.setValue('VC_LOGIN', t, { shouldValidate: true })}
                  errorText={personalForm.formState.errors.VC_LOGIN?.message}
                />
                <TextField
                  label="Telefone Fixo"
                  placeholder="(00) 0000-0000"
                  keyboardType="phone-pad"
                  onChangeText={(t) => personalForm.setValue('VC_TELRESIDENCIAL', t, { shouldValidate: true })}
                  errorText={personalForm.formState.errors.VC_TELRESIDENCIAL?.message as any}
                />
                <TextField
                  label="Celular"
                  placeholder="(00) 00000-0000"
                  keyboardType="phone-pad"
                  onChangeText={(t) => personalForm.setValue('VC_CELULAR', t, { shouldValidate: true })}
                  errorText={personalForm.formState.errors.VC_CELULAR?.message}
                />
                <TextField
                  label="Sexo"
                  placeholder="Selecione"
                  onChangeText={(t) => personalForm.setValue('VC_SEXO', t, { shouldValidate: true })}
                  errorText={personalForm.formState.errors.VC_SEXO?.message}
                />
                <TextField
                  label="Senha"
                  placeholder="****"
                  secure
                  onChangeText={(t) => personalForm.setValue('VC_SENHA', t, { shouldValidate: true })}
                  errorText={personalForm.formState.errors.VC_SENHA?.message}
                />
                <TextField
                  label="Confirmar Senha"
                  placeholder="****"
                  secure
                  onChangeText={(t) => personalForm.setValue('CONFIRMAR_SENHA', t, { shouldValidate: true })}
                  errorText={personalForm.formState.errors.CONFIRMAR_SENHA?.message}
                />

                <Button title="Próximo" onPress={goNext} />
              </>
            )}

            {step === 2 && (
              <>
                <TextField
                  label="CEP"
                  placeholder="00000-000"
                  keyboardType="number-pad"
                  onChangeText={(t) => addressForm.setValue('VC_CEP', t, { shouldValidate: true })}
                  errorText={addressForm.formState.errors.VC_CEP?.message}
                />
                <TextField
                  label="Logradouro"
                  placeholder="Rua, Avenida..."
                  onChangeText={(t) => addressForm.setValue('VC_LOGRADOURO', t, { shouldValidate: true })}
                  errorText={addressForm.formState.errors.VC_LOGRADOURO?.message}
                />
                <TextField
                  label="Número"
                  placeholder="Número da residência"
                  keyboardType="number-pad"
                  onChangeText={(t) => addressForm.setValue('NI_NUMERO', t, { shouldValidate: true })}
                  errorText={addressForm.formState.errors.NI_NUMERO?.message}
                />
                <TextField
                  label="Complemento"
                  placeholder="Complemento"
                  onChangeText={(t) => addressForm.setValue('VC_COMPLEMENTO', t, { shouldValidate: true })}
                  errorText={addressForm.formState.errors.VC_COMPLEMENTO?.message}
                />
                <TextField
                  label="Bairro"
                  placeholder="Bairro"
                  onChangeText={(t) => addressForm.setValue('VC_BAIRRO', t, { shouldValidate: true })}
                  errorText={addressForm.formState.errors.VC_BAIRRO?.message}
                />
                <TextField
                  label="Município"
                  placeholder="Cidade"
                  onChangeText={(t) => addressForm.setValue('VC_MUNICIPIO', t, { shouldValidate: true })}
                  errorText={addressForm.formState.errors.VC_MUNICIPIO?.message}
                />
                <TextField
                  label="UF"
                  placeholder="Estado"
                  onChangeText={(t) => addressForm.setValue('VC_UF', t, { shouldValidate: true })}
                  errorText={addressForm.formState.errors.VC_UF?.message}
                />

                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Button title="Voltar" onPress={() => setStep(1)} />
                  </View>
                  <View style={{ width: 12 }} />
                  <View style={{ flex: 1 }}>
                    <Button title="Cadastrar" onPress={submit} loading={loading} />
                  </View>
                </View>
              </>
            )}
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

