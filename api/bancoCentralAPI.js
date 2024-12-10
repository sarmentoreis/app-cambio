import axios from "axios";

const BASE_URL =
  "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata";

const bancoCentralApi = {
  async getMoedas() {
    try {
      const response = await axios.get(
        `${BASE_URL}/Moedas?$top=100&$format=json`
      );
      return response.data.value;
    } catch (error) {
      console.error("Erro ao obter a lista de moedas:", error);
      throw error;
    }
  },

  async getCotacaoMoeda(moeda, data) {
    try {
      const url = `${BASE_URL}/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='${moeda}'&@dataCotacao='${data}'&$top=1&$format=json`;
      const response = await axios.get(url);
      return response.data.value;
    } catch (error) {
      console.error(
        `Erro ao obter a cotação da moeda ${moeda} na data ${data}:`,
        error
      );
      throw error;
    }
  },
};

export default bancoCentralApi;
