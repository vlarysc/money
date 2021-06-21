export function novaEmpresa() {
  return {
    id: 0,
    tipoCobranca: {
      id: null
    },
    pessoa: {
      nome: "",
      nickName: "",
      email: "",
      tipoPessoa: "PJ",
      documento1: "",
      documento2: "",
      documento3: "",
      telefone1: "",
      telefone2: "",
      telefone3: "",
      enderecos: []
    },
    url: ""
  };
}

export const newTipoCobranca = {};

export function pageSizeDefault() {
  return { page: 0, size: 8 };
}
