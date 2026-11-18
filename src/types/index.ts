export type NivelAcesso = 'super_admin' | 'gerente' | 'funcionario';

export type Gondola = 'Ler' | 'Estudar';

export type StatusEmprestimo = 'ativo' | 'renovado' | 'devolvido';

export interface Livro {
  id: string;
  titulo: string;
  autor: string;
  id_autor?: string;
  editora: string;
  id_editora?: string;
  ano_lancamento: number;
  categoria: string;
  gondola: Gondola;
  colecao?: string;
  capa_url: string;
  sinopse: string;
  quantidade_total: number;
  quantidade_disponivel: number;
  data_cadastro?: string;
}

export interface Autor {
  id: string;
  nome: string;
  biografia?: string;
}

export interface Editora {
  id: string;
  nome: string;
}

export interface Leitor {
  id: string;
  nome_completo: string;
  idade: number;
  escolaridade: string;
  endereco: string;
  celular: string;
  email: string;
  escola: string;
  data_consentimento_lgpd: string; // ISO string
  ajuda_mensal_paga: boolean;
  data_cadastro: string;
}

export interface Funcionario {
  id: string;
  nome: string;
  email: string;
  senha_hash: string;
  nivel_acesso: NivelAcesso;
  cargo: string;
  ativo: boolean;
  criado_em: string;
}

export interface Emprestimo {
  id: string;
  id_leitor: string;
  id_livro: string;
  data_inicio: string; // YYYY-MM-DD
  data_devolucao_prevista: string; // YYYY-MM-DD (15 dias depois)
  data_devolucao_real?: string; // YYYY-MM-DD
  status: StatusEmprestimo;
  observacoes?: string;
}

export interface ConfiguracaoBiblioteca {
  nome_biblioteca: string;
  slogan: string;
  endereco: string;
  bairro: string;
  cidade_uf: string;
  cep: string;
  email: string;
  telefone: string;
  whatsapp: string;
  horario_funcionamento: string;
  valor_ajuda_mensal: number; // R$ 3,00
  max_livros_mes: number; // 3 livros
  prazo_dias: number; // 15 dias
  licenca_ativa: boolean;
  licenca_chave: string;
  data_ativacao?: string;
}

export interface EmprestimoComDetalhes extends Emprestimo {
  livro?: Livro;
  leitor?: Leitor;
  dias_restantes: number;
  atrasado: boolean;
}
