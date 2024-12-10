import { StyleSheet } from "react-native";
import TransacaoListScreen from "./screens/TransacaoListScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AutenticacaoScreen from "./screens/AutenticacaoScreen";
import AddTransacaoScreen from "./screens/AddTransacaoScreen";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import cambio from "./utils/cambio";
import EditTransacaoScreen from "./screens/EditTransacaoScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  const [listaTransacao, setListaTransacao] = useState([]);

  async function novaTransacao(transacao) {
    transacao.valor = await cambio(
      transacao.moeda,
      transacao.data,
      transacao.valor
    );
    if (transacao.id) {
      const listaAtualizada = listaTransacao.map((item) =>
        item.id === transacao.id ? { ...item, ...transacao } : item
      );
      setListaTransacao(listaAtualizada);
    } else {
      const id = listaTransacao.length + 1;
      const trasancaoComID = { ...transacao, id };
      setListaTransacao([...listaTransacao, trasancaoComID]);
    }
  }
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#f8f8f8",
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8e8e93",
      }}
    >
      <Tab.Screen
        name="Transações"
        options={{
          tabBarLabel: "Transações",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      >
        {() => (
          <TransacaoListScreen
            DATA={listaTransacao}
            novaTransacao={novaTransacao}
            setListaTransacao={setListaTransacao}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Novas Transações"
        options={{
          tabBarLabel: "Novas Transações",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" color={color} size={size} />
          ),
        }}
        component={(props) => (
          <AddTransacaoScreen {...props} novaTransacao={novaTransacao} />
        )}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={AutenticacaoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Editar Transações"
          component={EditTransacaoScreen}
          options={{
            title: "Editar Transação",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
