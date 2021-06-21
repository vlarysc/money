import { date } from "quasar";
function novaPessoa() {
  return {
    nome: "",
    apelido: "",
    email: "",
    tipoPessoa: "PJ",
    documento1: "",
    documento2: "",
    documento3: "",
    telefone1: "",
    telefone2: "",
    telefone3: "",
    nascimento: null,
    ativo: "S",
    created_id: 0,
    updated_id: 0,
    created_at: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss"),
    updated_at: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss"),
    enderecos: []
  };
}
export function novaFilial() {
  return {
    pessoa: novaPessoa(),
    ativo: "S",
    id_aux: null,
    created_id: 0,
    updated_id: 0
  };
}

export function novoPlanoEmpresa() {
  return {
    formapagamento_id: null,
    ativo: "S",
    responsavel_legal: "",
    data_inicio: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss"),
    data_fim: null,
    dia_vencimento: "10",
    vendedor_id: null,
    supervisor_id: null,
    observacoes: "",
    id_aux: "",
    created_id: 0,
    updated_id: 0,
    created_at: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss"),
    updated_at: date.formatDate(Date.now(), "YYYY-MM-DD HH:mm:ss"),
    pessoa: novaPessoa()
  };
}

export function novoFuncionario() {
  return {
    pessoa_id: "",
    filial_id: null,
    salario_atual: null,
    login: null,
    password: "",
    supervisor_id: null,
    comissao_venda: "N",
    valor_comissao_venda: null,
    valor_comissao_venda_pct: null,
    comissao_cobranca: "N",
    valor_comissao_cobranca: null,
    valor_comissao_cobranca_pct: null,
    comissao_servico: "N",
    valor_comissao_servico: null,
    valor_comissao_servico_pct: null,
    comissão_entrega: "N",
    valor_comissao_entrega: null,
    valor_comissao_entrega_pct: null,
    comissao_pagamento: "N",
    valor_comissao_pagamento: null,
    valor_comissao_pagamento_pct: null,
    status: "A",
    senha_expirada: "S",
    ativo: "S",
    id_aux: null,
    created_id: 0,
    updated_id: 0,
    roles: [],
    pessoa: novaPessoa()
  };
}

export function pageSizeDefault() {
  return { page: 1, size: 10 };
}
