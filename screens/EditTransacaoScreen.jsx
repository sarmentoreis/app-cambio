import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { Picker } from "@react-native-picker/picker";
import bancoCentralApi from "../api/bancoCentralAPI";

export default function EditTransacaoScreen({ route, navigation }) {
  const { transacao, novaTransacao } = route.params;
  const [descricao, setDescricao] = useState(transacao.descricao || "");
  const [valor, setValor] = useState(Number(transacao.valor) || 0);
  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [categoria, setCategoria] = useState(transacao.categoria || "");
  const [moeda, setMoeda] = useState(transacao.moeda || "");
  const [tipo, setTipo] = useState(transacao.tipo || false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [getMoedas, setGetMoedas] = useState([]);

  useEffect(() => {
    async function fetchMoedas() {
      setGetMoedas(await bancoCentralApi.getMoedas());
    }
    fetchMoedas();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
        placeholder="Descrição"
        keyboardType="default"
      />
      <TextInput
        value={valor.toString()}
        onChangeText={(text) => {
          const valorNumerico = parseFloat(text) || 0;
          setValor(valorNumerico);
        }}
        style={styles.input}
        placeholder="Valor"
        keyboardType="decimal-pad"
      />
      <View style={styles.view}>
        <Pressable
          style={styles.pressable}
          onPress={() => setShowDatePicker(true)}
        >
          <MaterialIcons name="date-range" size={24} color="black" />
          <Text>Data</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={() => setShowTimePicker(true)}
        >
          <MaterialCommunityIcons
            name="clock-outline"
            size={24}
            color="black"
          />
          <Text>Hora</Text>
        </Pressable>
      </View>
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          maximumDate={new Date()}
          onChange={(_, date) => {
            setShowDatePicker(false);
            if (date) setData(date);
          }}
          value={data}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          onChange={(_, time) => {
            setShowTimePicker(false);
            if (time) setHora(time);
          }}
          value={hora}
        />
      )}
      <Picker
        style={styles.input}
        selectedValue={categoria}
        onValueChange={setCategoria}
      >
        <Picker.Item label="Selecione uma categoria" value={""} />
        <Picker.Item label="Alimentação" value={"Alimentação"} />
        <Picker.Item label="Saúde" value={"Saúde"} />
      </Picker>
      <Picker
        style={styles.input}
        selectedValue={moeda}
        onValueChange={setMoeda}
      >
        <Picker.Item label="Selecione uma moeda" value={""} />
        {getMoedas.map((cadaMoeda, i) => (
          <Picker.Item
            key={i}
            label={cadaMoeda.simbolo}
            value={cadaMoeda.simbolo}
          />
        ))}
      </Picker>
      <View style={styles.view}>
        <Text>Tipo: </Text>
        <Text>Receita</Text>
        <Switch value={tipo} onValueChange={setTipo} />
        <Text>Despesa</Text>
      </View>
      <View style={styles.save}>
        <Pressable
          onPress={() => {
            const transacaoAtualizada = {
              ...transacao,
              descricao,
              valor,
              data: data.toLocaleDateString(),
              hora: hora.toLocaleTimeString(),
              categoria,
              moeda,
              tipo,
            };
            novaTransacao(transacaoAtualizada);
            navigation.pop();
          }}
        >
          <Entypo name="save" size={50} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    margin: 15,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#f5f5f5",
  },
  view: {
    marginRight: 30,
    marginLeft: 20,
    marginTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  pressable: {
    flexDirection: "row",
  },
  input: {
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
  save: {
    margin: 30,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
