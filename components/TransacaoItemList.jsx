import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, { useAnimatedStyle } from "react-native-reanimated";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

export default function TransacaoItemList({
  id,
  descricao,
  data,
  hora,
  valor,
  tipo,
  moeda,
  categoria,
  deleteItem,
  novaTransacao,
}) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const isLandscape = width > height;
  const type = tipo ? "Despesa" : "Receita";

  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        renderLeftActions={(_, drag) => {
          const styleAnimation = useAnimatedStyle(() => {
            return {
              transform: [{ translateX: drag.value - 50 }],
            };
          });
          return (
            <Reanimated.View style={[styles.icone, styleAnimation]}>
              <Pressable style={styles.boxIcon} onPress={() => deleteItem(id)}>
                <Entypo name="trash" size={25} color="black" />
              </Pressable>
            </Reanimated.View>
          );
        }}
        renderRightActions={(_, drag) => {
          const styleAnimation = useAnimatedStyle(() => {
            return {
              transform: [{ translateX: drag.value + 50 }],
            };
          });
          return (
            <Reanimated.View style={[styles.icone, styleAnimation]}>
              <Pressable
                style={styles.boxIcon}
                onPress={() => {
                  const transacao = {
                    id,
                    descricao,
                    data,
                    hora,
                    valor,
                    tipo,
                    moeda,
                    categoria,
                  };
                  navigation.navigate("Editar Transações", {
                    transacao,
                    novaTransacao,
                  });
                }}
              >
                <Entypo name="edit" size={25} color="black" />
              </Pressable>
            </Reanimated.View>
          );
        }}
      >
        {isLandscape ? (
          <View style={styles.container}>
            <View style={styles.items}>
              <Text style={styles.horizontalText}>{descricao}</Text>
              <Text style={styles.horizontalText}>{data}</Text>
              <Text style={styles.horizontalText}>{hora}</Text>
            </View>
            <View style={styles.items}>
              <Text style={styles.horizontalText}>{moeda}</Text>
              <Text style={styles.horizontalText}>{type}</Text>
            </View>
            <View style={styles.items}>
              <Text style={styles.horizontalText}>R$ {valor}</Text>
              <Text style={styles.horizontalText}>{categoria}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.items}>
              <Text style={styles.h2}>{descricao}</Text>
              <Text style={styles.h2}>{data}</Text>
            </View>
            <View style={styles.items}>
              <Text style={styles.h1}>R$: {valor}</Text>
            </View>
          </View>
        )}
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
    marginTop: 5,
  },
  items: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 5,
  },
  h1: {
    fontWeight: "bold",
    fontSize: 30,
  },
  h2: {
    fontSize: 20,
  },
  horizontalText: {
    fontSize: 18,
  },
  boxIcon: {
    width: 50,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  icone: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    marginTop: 5,
    height: "auto",
  },
});
