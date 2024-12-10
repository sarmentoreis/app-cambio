import { FlatList, View } from "react-native";
import TransacaoItemList from "../components/TransacaoItemList";
import FiltrosList from "../components/FiltrosList";
import { useEffect, useState, useMemo } from "react";

export default function TransacaoListScreen({
  DATA,
  setListaTransacao,
  novaTransacao,
}) {
  const [filtro, setFiltro] = useState("");
  const [ordenacao, setOrdenacao] = useState("");

  const dataFiltrado = useMemo(() => {
    let resultado = [...DATA];

    if (filtro) {
      resultado = resultado.filter((item) =>
        item.descricao.toLowerCase().includes(filtro.toLowerCase())
      );
    }

    if (ordenacao === "asc") {
      resultado.sort((a, b) => a.descricao.localeCompare(b.descricao));
    } else if (ordenacao === "desc") {
      resultado.sort((a, b) => b.descricao.localeCompare(a.descricao));
    }

    return resultado;
  }, [DATA, filtro, ordenacao]);

  const deleteItem = (id) => {
    setListaTransacao((prevData) => prevData.filter((item) => item.id !== id));
  };
  return (
    <View>
      <FiltrosList
        filtro={filtro}
        setFiltro={setFiltro}
        ordenacao={ordenacao}
        setOrdenacao={setOrdenacao}
      />
      <FlatList
        data={dataFiltrado}
        renderItem={({ item }) => (
          <TransacaoItemList
            id={item.id}
            descricao={item.descricao}
            data={item.data}
            hora={item.hora}
            tipo={item.tipo}
            moeda={item.moeda}
            valor={item.valor}
            categoria={item.categoria}
            deleteItem={deleteItem}
            novaTransacao={novaTransacao}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
