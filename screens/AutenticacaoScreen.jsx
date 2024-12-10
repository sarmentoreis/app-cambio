import { Button, Image, StyleSheet, TextInput, View } from "react-native";

export default function AutenticacaoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image style={styles.logo} source={require("../assets/exchange.png")} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Login"
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        keyboardType="default"
        secureTextEntry
      />
      <Button
        color={"gray"}
        title="Acessar"
        onPress={() => navigation.replace("Main")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#f5f5f5",
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  containerLogo: {
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
});
