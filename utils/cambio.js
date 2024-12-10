import bancoCentralApi from "../api/bancoCentralAPI";

async function cambio(moeda, data, valor) {
  const conversao = await bancoCentralApi.getCotacaoMoeda(moeda, data);
  let cambio;
  if (Array.isArray(conversao) && conversao.length === 0) {
    cambio = 0;
  } else {
    cambio = (valor * conversao[0].cotacaoCompra).toFixed(2);
  }
  return cambio;
}

export default cambio;
