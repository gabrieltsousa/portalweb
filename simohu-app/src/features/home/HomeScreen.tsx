import React from "react";
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Linking,
} from "react-native";
import { colors } from "../../theme/colors";
import { Button } from "../../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../app/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const logo: ImageSourcePropType = require("../../../assets/facil-alagoas-vetorizada-colorida.png");
  const logoSimohu: ImageSourcePropType = require("../../../assets/logo-simohu.png");


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>

        {/* Aviso empresas */}
        <View style={styles.centralContainer}>
          <View style={styles.alertBox} 
          >
            <Text style={styles.alertText}
             onPress={() => Linking.openURL('https://portal.facilalagoas.com.br/SBE4/portal/loginPJ.xhtml')}
            >
              Empresas (Pessoa Jurídica) - Retornar ao Portal Antigo
            </Text>
          </View>
          {/* Texto de boas-vindas */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeSubtitle}>Bem-vindo ao</Text>
            <Text style={styles.welcomeTitle}>Portal Fácil Alagoas</Text>
            <Text style={styles.welcomeDescription}>
              Acesse o portal usando suas credenciais e faça login. Se ainda não
              possui conta. Cadastre-se agora.
            </Text>
          </View>

          {/* Botões */}
          <View style={styles.buttonsContainer}>
            <Button
              title="Faça Login"
              onPress={() => navigation.navigate("Login")}
            />
            <View style={styles.spacer} />
            <Button
              title="Cadastre-se"
              onPress={() => navigation.navigate("AccountType")}
              style={styles.registerButton}
              colorText={colors.text}
            />
          </View>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Fácil Alagoas. Todos os direitos reservados
          </Text>
          <View style={styles.footerSpacer}>
          <Image source={logoSimohu} style={styles.logofooter} />
          <Text style={styles.footerText}>SIMOHU Versão 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.background,
  },
  centralContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  scroll: {
    flexGrow: 1, 
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: 8,
  },
  logo: {
    width: 140,
    height: 90,
    resizeMode: "contain",
  },
  alertBox: {
    backgroundColor: "#F88407",
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
  alertText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  welcomeContainer: {
    marginTop: 36,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  welcomeSubtitle: {
    color: colors.textSecondary,
    fontSize: 24,
  },
  welcomeTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 28,
    marginTop: 4,
  },
  welcomeDescription: {
    color: colors.textSecondary,
    marginTop: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 24,
    paddingHorizontal: 16,
    gap: 24,
    justifyContent: "center",
  },
  spacer: {
    height: 12,
  },
  registerButton: {
    backgroundColor: "transparent" as any,
    borderColor: "#dfdfdf",
    borderWidth: 1,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 12,
    justifyContent: 'flex-end'
  },
  footerSpacer: {
      flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  marginTop:10,
  },
    logofooter: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});
