import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function FiltrosList({
  filtro,
  setFiltro,
  ordenacao,
  setOrdenacao,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        value={filtro}
        onChangeText={setFiltro}
        style={styles.input}
        placeholder="Filtro"
        keyboardType="default"
      />
      <Picker
        style={styles.input}
        value={ordenacao}
        onValueChange={setOrdenacao}
      >
        <Picker.Item label="Ordenação" value={""} />
        <Picker.Item label="ASC" value={"asc"} />
        <Picker.Item label="DESC" value={"desc"} />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    margin: 15,
    backgroundColor: "#f5f5f5",
  },
  input: {
    borderWidth: 1,
  },
});
