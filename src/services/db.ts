import {
  Livro,
  Autor,
  Editora,
  Leitor,
  Funcionario,
  Emprestimo,
  ConfiguracaoBiblioteca,
  EmprestimoComDetalhes,
} from '../types';

const STORAGE_KEYS = {
  LIVROS: 'bibliocomunidade_livros_v1',
  AUTORES: 'bibliocomunidade_autores_v1',
  EDITORAS: 'bibliocomunidade_editoras_v1',
  LEITORES: 'bibliocomunidade_leitores_v1',
  FUNCIONARIOS: 'bibliocomunidade_funcionarios_v1',
  EMPRESTIMOS: 'bibliocomunidade_emprestimos_v1',
  CONFIGURACAO: 'bibliocomunidade_configuracao_v1',
  AUTH_SESSION: 'bibliocomunidade_session_v1',
};

// Initial Seed Data
const INITIAL_CONFIG: ConfiguracaoBiblioteca = {
  nome_biblioteca: 'Biblioteca Comunitária Esperança & Saber',
  slogan: 'Conhecimento compartilhado e incentivo à leitura em nossa comunidade',
  endereco: 'Rua das Acácias, 450 - Centro Cultural Comunitário',
  bairro: 'Vila Esperança',
  cidade_uf: 'São Paulo - SP',
  cep: '01310-200',
  email: 'contato@bibliocomunitaria.org.br',
  telefone: '(11) 3284-9000',
  whatsapp: '(11) 98765-4321',
  horario_funcionamento: 'Segunda a Sexta: 08:30 às 18:00 | Sábados: 09:00 às 13:00',
  valor_ajuda_mensal: 3.0,
  max_livros_mes: 3,
  prazo_dias: 15,
  licenca_ativa: true,
  licenca_chave: 'BIBLIO-COM-2026-SP-77491',
  data_ativacao: '2026-01-15',
};

const INITIAL_AUTORES: Autor[] = [
  { id: 'aut-1', nome: 'Álvaro Almeida Reis', biografia: 'Ficcionista e ensaísta contemporâneo, vencedor de prêmios literários nacionais.' },
  { id: 'aut-2', nome: 'Dra. Eleanor J. Vance', biografia: 'Astrofísica e divulgadora científica renomada.' },
  { id: 'aut-3', nome: 'Dr. Alexander G. Thornton', biografia: 'Arquiteto, arqueólogo e professor emérito de História da Arte.' },
  { id: 'aut-4', nome: 'Machado de Assis', biografia: 'Maior escritor do realismo brasileiro e fundador da Academia Brasileira de Letras.' },
  { id: 'aut-5', nome: 'Clarice Lispector', biografia: 'Uma das mais importantes escritoras brasileiras do século XX.' },
  { id: 'aut-6', nome: 'Ariano Suassuna', biografia: 'Dramaturgo, romancista e poeta paraibano, defensor da cultura popular nordestina.' },
  { id: 'aut-7', nome: 'Carl Sagan', biografia: 'Cientista, astrônomo e célebre autor de obras de divulgação astronômica.' },
  { id: 'aut-8', nome: 'Paulo Freire', biografia: 'Educador e filósofo brasileiro, patrono da educação brasileira.' },
];

const INITIAL_EDITORAS: Editora[] = [
  { id: 'edt-1', nome: 'Editora São Francisco' },
  { id: 'edt-2', nome: 'Cambridge University Press' },
  { id: 'edt-3', nome: 'Companhia das Letras' },
  { id: 'edt-4', nome: 'Editora Record' },
  { id: 'edt-5', nome: 'Editora Paz e Terra' },
  { id: 'edt-6', nome: 'Vozes Universitária' },
];

const INITIAL_LIVROS: Livro[] = [
  {
    id: 'liv-1',
    titulo: 'O Mar de Ondas Velhas',
    autor: 'Álvaro Almeida Reis',
    id_autor: 'aut-1',
    editora: 'Editora São Francisco',
    id_editora: 'edt-1',
    ano_lancamento: 2024,
    categoria: 'Literatura Brasileira',
    gondola: 'Ler',
    colecao: 'Novelas Contemporâneas',
    capa_url: '/src/assets/images/book_cover_literatura_1793967523519.jpg',
    sinopse: 'Um romance poético que narra o retorno de um pescador e cronista à sua vila natal na costa brasileira. Entre memórias de infância, o ritmo das marés e segredos de família guardados em cartas antigas, a obra explora a passagem do tempo e as transformações sociais nas pequenas comunidades litorâneas.',
    quantidade_total: 4,
    quantidade_disponivel: 3,
    data_cadastro: '2026-02-10',
  },
  {
    id: 'liv-2',
    titulo: 'Cosmos & Chaos: A Foundation in Physics & Astronomy',
    autor: 'Dra. Eleanor J. Vance',
    id_autor: 'aut-2',
    editora: 'Cambridge University Press',
    id_editora: 'edt-2',
    ano_lancamento: 2023,
    categoria: 'Física & Astronomia',
    gondola: 'Estudar',
    colecao: 'Manuais Universitários',
    capa_url: '/src/assets/images/book_cover_ciencias_1793967522193.jpg',
    sinopse: 'Guia acessível e profundo sobre os fundamentos da mecânica celeste, relatividade e os mistérios da matéria escura. Indicado para estudantes de ensino médio e universitários que desejam aprofundar a compreensão das leis físicas que regem as galáxias.',
    quantidade_total: 3,
    quantidade_disponivel: 2,
    data_cadastro: '2026-02-15',
  },
  {
    id: 'liv-3',
    titulo: 'Architectures of the Past: Classical and European Design',
    autor: 'Dr. Alexander G. Thornton',
    id_autor: 'aut-3',
    editora: 'Editora São Francisco',
    id_editora: 'edt-1',
    ano_lancamento: 2022,
    categoria: 'História & Arte',
    gondola: 'Estudar',
    colecao: 'Patrimônio Mundial',
    capa_url: '/src/assets/images/book_cover_historia_1793967523098.jpg',
    sinopse: 'Estudo ricamente ilustrado com gravuras, proporção áurea e plantas técnicas que detalham o desenvolvimento da arquitetura desde os templos gregos até o Iluminismo europeu. Essencial para pesquisas escolares, vestibulandos e apreciadores de história.',
    quantidade_total: 2,
    quantidade_disponivel: 1,
    data_cadastro: '2026-02-20',
  },
  {
    id: 'liv-4',
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    id_autor: 'aut-4',
    editora: 'Companhia das Letras',
    id_editora: 'edt-3',
    ano_lancamento: 1899,
    categoria: 'Literatura Brasileira',
    gondola: 'Ler',
    colecao: 'Clássicos Imortais',
    capa_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80',
    sinopse: 'A obra-prima machadiana onde Bento Santiago relembra sua juventude e seu amor por Capitu. Um dos maiores romances psicológicos da língua portuguesa, que desafia gerações de leitores a refletir sobre ciúme, perspectiva e memória.',
    quantidade_total: 5,
    quantidade_disponivel: 0, // INDISPONÍVEL PROPOSITADAMENTE PARA DEMONSTRAR STATUS VERMELHO
    data_cadastro: '2026-01-10',
  },
  {
    id: 'liv-5',
    titulo: 'A Hora da Estrela',
    autor: 'Clarice Lispector',
    id_autor: 'aut-5',
    editora: 'Editora Record',
    id_editora: 'edt-4',
    ano_lancamento: 1977,
    categoria: 'Literatura Brasileira',
    gondola: 'Ler',
    colecao: 'Obras de Clarice Lispector',
    capa_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    sinopse: 'A comovente história de Macabéa, uma jovem datilógrafa alagoana que vive no Rio de Janeiro. Narrada pelo alter-ego Rodrigo S.M., a obra aborda a invisibilidade social, a busca por identidade e a poesia das existências miúdas.',
    quantidade_total: 4,
    quantidade_disponivel: 2,
    data_cadastro: '2026-01-12',
  },
  {
    id: 'liv-6',
    titulo: 'Auto da Compadecida',
    autor: 'Ariano Suassuna',
    id_autor: 'aut-6',
    editora: 'Editora Record',
    id_editora: 'edt-4',
    ano_lancamento: 1955,
    categoria: 'Teatro & Literatura',
    gondola: 'Ler',
    colecao: 'Teatro Popular Nordestino',
    capa_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    sinopse: 'Peça teatral emblemática que une elementos da tradição oral nordestina, literatura de cordel e farsa medieval. Os ardis de João Grilo e Chicó no sertão culminam em um surpreendente julgamento celeste com a intervenção da Virgem Maria.',
    quantidade_total: 3,
    quantidade_disponivel: 1,
    data_cadastro: '2026-01-14',
  },
  {
    id: 'liv-7',
    titulo: 'Cosmos',
    autor: 'Carl Sagan',
    id_autor: 'aut-7',
    editora: 'Companhia das Letras',
    id_editora: 'edt-3',
    ano_lancamento: 1980,
    categoria: 'Divulgação Científica',
    gondola: 'Estudar',
    colecao: 'Ciência para Todos',
    capa_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    sinopse: 'Uma jornada extraordinária pelos quinze bilhões de anos de evolução cósmica e pelo desenvolvimento da ciência e civilização. Com linguagem poética e rigorosa, Sagan convida o leitor a compreender o nosso papel no tecido do universo.',
    quantidade_total: 3,
    quantidade_disponivel: 0, // INDISPONÍVEL PROPOSITADAMENTE
    data_cadastro: '2026-01-18',
  },
  {
    id: 'liv-8',
    titulo: 'Pedagogia da Autonomia: Saberes Necessários à Prática Educativa',
    autor: 'Paulo Freire',
    id_autor: 'aut-8',
    editora: 'Editora Paz e Terra',
    id_editora: 'edt-5',
    ano_lancamento: 1996,
    categoria: 'Educação & Filosofia',
    gondola: 'Estudar',
    colecao: 'Coleção Leitura e Crítica',
    capa_url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=600&q=80',
    sinopse: 'Último livro publicado em vida pelo educador Paulo Freire. Discute a ética pedagógica, o respeito à dignidade e aos saberes do educando, a criticidade e a importância da esperança no processo de ensino-aprendizagem.',
    quantidade_total: 4,
    quantidade_disponivel: 3,
    data_cadastro: '2026-01-22',
  },
  {
    id: 'liv-9',
    titulo: 'Quincas Borba',
    autor: 'Machado de Assis',
    id_autor: 'aut-4',
    editora: 'Editora Record',
    id_editora: 'edt-4',
    ano_lancamento: 1891,
    categoria: 'Literatura Brasileira',
    gondola: 'Ler',
    colecao: 'Trilogia Realista',
    capa_url: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80',
    sinopse: 'Ao herdar a fortuna e o cão do filósofo Quincas Borba, o ingênuo Rubião muda-se para a corte imperial, onde se torna presa fácil de aproveitadores. Um retrato satírico da sociedade oitocentista.',
    quantidade_total: 2,
    quantidade_disponivel: 2,
    data_cadastro: '2026-01-25',
  },
  {
    id: 'liv-10',
    titulo: 'História do Brasil para Estudantes',
    autor: 'Dr. Alexander G. Thornton',
    id_autor: 'aut-3',
    editora: 'Vozes Universitária',
    id_editora: 'edt-6',
    ano_lancamento: 2021,
    categoria: 'História & Sociedade',
    gondola: 'Estudar',
    colecao: 'Cadernos do Vestibular',
    capa_url: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=600&q=80',
    sinopse: 'Visão panorâmica e crítica dos períodos Colonial, Imperial e Republicano do Brasil, com mapas temáticos, documentos históricos transcritos e exercícios comentados.',
    quantidade_total: 3,
    quantidade_disponivel: 2,
    data_cadastro: '2026-02-01',
  },
];

const INITIAL_FUNCIONARIOS: Funcionario[] = [
  {
    id: 'usr-super-admin',
    nome: 'Carlos Eduardo Mendes (Criador)',
    email: 'admin@biblioteca.org',
    senha_hash: 'admin123', // Demo plain check with simulated hash
    nivel_acesso: 'super_admin',
    cargo: 'Super Administrador / Fundador',
    ativo: true,
    criado_em: '2025-01-01',
  },
  {
    id: 'usr-gerente',
    nome: 'Mariana Duarte Prado',
    email: 'gerente@biblioteca.org',
    senha_hash: 'gerente123',
    nivel_acesso: 'gerente',
    cargo: 'Gerente da Biblioteca',
    ativo: true,
    criado_em: '2025-02-15',
  },
  {
    id: 'usr-funcionario',
    nome: 'Lucas Silva Pereira',
    email: 'funcionario@biblioteca.org',
    senha_hash: 'funcionario123',
    nivel_acesso: 'funcionario',
    cargo: 'Assistente de Acervo & Atendimento',
    ativo: true,
    criado_em: '2025-05-10',
  },
];

const INITIAL_LEITORES: Leitor[] = [
  {
    id: 'lei-1',
    nome_completo: 'Beatriz Vasconcelos de Souza',
    idade: 17,
    escolaridade: 'Ensino Médio (3º ano)',
    endereco: 'Rua das Flores, 112 - Vila Esperança',
    celular: '(11) 98111-2233',
    email: 'beatriz.souza@estudante.org',
    escola: 'E.E. Professora Maria Montessori',
    data_consentimento_lgpd: '2026-01-10T14:30:00.000Z',
    ajuda_mensal_paga: true,
    data_cadastro: '2026-01-10',
  },
  {
    id: 'lei-2',
    nome_completo: 'Gabriel Henrique Oliveira',
    idade: 15,
    escolaridade: 'Ensino Fundamental II (9º ano)',
    endereco: 'Av. Brasil, 400 - Apto 32',
    celular: '(11) 97222-3344',
    email: 'gabriel.henrique@gmail.com',
    escola: 'Colégio Estadual Tiradentes',
    data_consentimento_lgpd: '2026-01-15T10:15:00.000Z',
    ajuda_mensal_paga: true,
    data_cadastro: '2026-01-15',
  },
  {
    id: 'lei-3',
    nome_completo: 'Clarice Santos Guimarães',
    idade: 22,
    escolaridade: 'Ensino Superior (Letras)',
    endereco: 'Rua do Sol, 88 - Bairro Alto',
    celular: '(11) 99333-4455',
    email: 'clarice.guimaraes@usp.br',
    escola: 'Universidade de São Paulo (FFLCH)',
    data_consentimento_lgpd: '2026-02-01T16:00:00.000Z',
    ajuda_mensal_paga: false, // Ajuda pendente para teste
    data_cadastro: '2026-02-01',
  },
  {
    id: 'lei-4',
    nome_completo: 'Davi Lucca Ribeiro',
    idade: 12,
    escolaridade: 'Ensino Fundamental II (6º ano)',
    endereco: 'Rua Pinheiros, 230 - Casa B',
    celular: '(11) 96444-5566',
    email: 'davi.lucca.pais@gmail.com',
    escola: 'EMEF Paulo Freire',
    data_consentimento_lgpd: '2026-02-05T11:20:00.000Z',
    ajuda_mensal_paga: true,
    data_cadastro: '2026-02-05',
  },
];

const INITIAL_EMPRESTIMOS: Emprestimo[] = [
  {
    id: 'emp-1',
    id_leitor: 'lei-1',
    id_livro: 'liv-4', // Dom Casmurro
    data_inicio: '2026-10-25',
    data_devolucao_prevista: '2026-11-09',
    status: 'ativo',
    observacoes: 'Leitora preparatória para vestibular Fuvest.',
  },
  {
    id: 'emp-2',
    id_leitor: 'lei-2',
    id_livro: 'liv-7', // Cosmos
    data_inicio: '2026-10-15',
    data_devolucao_prevista: '2026-10-30', // ATRASADO (venceu há alguns dias)
    status: 'ativo',
    observacoes: 'Projeto escolar de feira de ciências.',
  },
  {
    id: 'emp-3',
    id_leitor: 'lei-3',
    id_livro: 'liv-5', // A Hora da Estrela
    data_inicio: '2026-10-01',
    data_devolucao_prevista: '2026-10-16',
    data_devolucao_real: '2026-10-14',
    status: 'devolvido',
    observacoes: 'Devolvido em perfeito estado antes do prazo.',
  },
];

class DatabaseService {
  private listeners: (() => void)[] = [];

  constructor() {
    this.initStorage();
  }

  private initStorage() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(STORAGE_KEYS.CONFIGURACAO)) {
      localStorage.setItem(STORAGE_KEYS.CONFIGURACAO, JSON.stringify(INITIAL_CONFIG));
    }
    if (!localStorage.getItem(STORAGE_KEYS.AUTORES)) {
      localStorage.setItem(STORAGE_KEYS.AUTORES, JSON.stringify(INITIAL_AUTORES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.EDITORAS)) {
      localStorage.setItem(STORAGE_KEYS.EDITORAS, JSON.stringify(INITIAL_EDITORAS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LIVROS)) {
      localStorage.setItem(STORAGE_KEYS.LIVROS, JSON.stringify(INITIAL_LIVROS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FUNCIONARIOS)) {
      localStorage.setItem(STORAGE_KEYS.FUNCIONARIOS, JSON.stringify(INITIAL_FUNCIONARIOS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LEITORES)) {
      localStorage.setItem(STORAGE_KEYS.LEITORES, JSON.stringify(INITIAL_LEITORES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.EMPRESTIMOS)) {
      localStorage.setItem(STORAGE_KEYS.EMPRESTIMOS, JSON.stringify(INITIAL_EMPRESTIMOS));
    }
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => {
      try {
        cb();
      } catch (err) {
        console.error('Database listener error:', err);
      }
    });
  }

  // Generic getter / setter
  private get<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      this.notify();
    } catch (err) {
      console.error('Storage set error:', err);
    }
  }

  // --- CONFIGURAÇÃO ---
  public getConfiguracao(): ConfiguracaoBiblioteca {
    return this.get<ConfiguracaoBiblioteca>(STORAGE_KEYS.CONFIGURACAO, INITIAL_CONFIG);
  }

  public updateConfiguracao(config: Partial<ConfiguracaoBiblioteca>): ConfiguracaoBiblioteca {
    const current = this.getConfiguracao();
    const updated = { ...current, ...config };
    this.set(STORAGE_KEYS.CONFIGURACAO, updated);
    return updated;
  }

  // --- LIVROS ---
  public getLivros(): Livro[] {
    return this.get<Livro[]>(STORAGE_KEYS.LIVROS, INITIAL_LIVROS);
  }

  public getLivroById(id: string): Livro | undefined {
    return this.getLivros().find((liv) => liv.id === id);
  }

  public saveLivro(livro: Omit<Livro, 'id'> & { id?: string }): Livro {
    const livros = this.getLivros();
    if (livro.id) {
      // Update
      const index = livros.findIndex((l) => l.id === livro.id);
      if (index >= 0) {
        const existing = livros[index];
        // Calculate difference in total to adjust available if needed
        const diffTotal = livro.quantidade_total - existing.quantidade_total;
        const newDisponivel = Math.max(0, Math.min(livro.quantidade_total, existing.quantidade_disponivel + diffTotal));
        
        const updatedLivro: Livro = {
          ...existing,
          ...livro,
          id: livro.id,
          quantidade_disponivel: livro.quantidade_disponivel !== undefined ? livro.quantidade_disponivel : newDisponivel,
        };
        livros[index] = updatedLivro;
        this.set(STORAGE_KEYS.LIVROS, livros);
        this.syncAutorAndEditora(updatedLivro.autor, updatedLivro.editora);
        return updatedLivro;
      }
    }

    // New Book
    const newLivro: Livro = {
      ...livro,
      id: `liv-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      quantidade_disponivel: livro.quantidade_disponivel !== undefined ? livro.quantidade_disponivel : livro.quantidade_total,
      data_cadastro: new Date().toISOString().split('T')[0],
    };
    livros.unshift(newLivro);
    this.set(STORAGE_KEYS.LIVROS, livros);
    this.syncAutorAndEditora(newLivro.autor, newLivro.editora);
    return newLivro;
  }

  public deleteLivro(id: string): { success: boolean; message?: string } {
    const emprestimos = this.getEmprestimos();
    const activeLoan = emprestimos.find((e) => e.id_livro === id && e.status !== 'devolvido');
    if (activeLoan) {
      return {
        success: false,
        message: 'Não é possível excluir este livro pois há um exemplar atualmente emprestado.',
      };
    }
    const livros = this.getLivros().filter((l) => l.id !== id);
    this.set(STORAGE_KEYS.LIVROS, livros);
    return { success: true };
  }

  // --- AUTORES & EDITORAS ---
  public getAutores(): Autor[] {
    return this.get<Autor[]>(STORAGE_KEYS.AUTORES, INITIAL_AUTORES);
  }

  public getEditoras(): Editora[] {
    return this.get<Editora[]>(STORAGE_KEYS.EDITORAS, INITIAL_EDITORAS);
  }

  private syncAutorAndEditora(autorNome: string, editoraNome: string) {
    if (autorNome) {
      const autores = this.getAutores();
      if (!autores.some((a) => a.nome.toLowerCase() === autorNome.trim().toLowerCase())) {
        autores.push({
          id: `aut-${Date.now()}`,
          nome: autorNome.trim(),
        });
        this.set(STORAGE_KEYS.AUTORES, autores);
      }
    }
    if (editoraNome) {
      const editoras = this.getEditoras();
      if (!editoras.some((e) => e.nome.toLowerCase() === editoraNome.trim().toLowerCase())) {
        editoras.push({
          id: `edt-${Date.now()}`,
          nome: editoraNome.trim(),
        });
        this.set(STORAGE_KEYS.EDITORAS, editoras);
      }
    }
  }

  // --- LEITORES (ALUNOS & COMUNIDADE) ---
  public getLeitores(): Leitor[] {
    return this.get<Leitor[]>(STORAGE_KEYS.LEITORES, INITIAL_LEITORES);
  }

  public getLeitorById(id: string): Leitor | undefined {
    return this.getLeitores().find((l) => l.id === id);
  }

  public saveLeitor(leitor: Omit<Leitor, 'id'> & { id?: string }): Leitor {
    const leitores = this.getLeitores();
    if (leitor.id) {
      const index = leitores.findIndex((l) => l.id === leitor.id);
      if (index >= 0) {
        const updated = { ...leitores[index], ...leitor, id: leitor.id };
        leitores[index] = updated;
        this.set(STORAGE_KEYS.LEITORES, leitores);
        return updated;
      }
    }

    const newLeitor: Leitor = {
      ...leitor,
      id: `lei-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      data_cadastro: new Date().toISOString().split('T')[0],
      // Always store LGPD timestamp when saving
      data_consentimento_lgpd: leitor.data_consentimento_lgpd || new Date().toISOString(),
    };
    leitores.unshift(newLeitor);
    this.set(STORAGE_KEYS.LEITORES, leitores);
    return newLeitor;
  }

  public deleteLeitor(id: string): { success: boolean; message?: string } {
    const emprestimos = this.getEmprestimos();
    const hasActiveLoan = emprestimos.some((e) => e.id_leitor === id && e.status !== 'devolvido');
    if (hasActiveLoan) {
      return {
        success: false,
        message: 'Não é possível excluir este leitor pois ele possui livros emprestados pendentes de devolução.',
      };
    }
    const leitores = this.getLeitores().filter((l) => l.id !== id);
    this.set(STORAGE_KEYS.LEITORES, leitores);
    return { success: true };
  }

  // --- EMPRÉSTIMOS ---
  public getEmprestimos(): Emprestimo[] {
    return this.get<Emprestimo[]>(STORAGE_KEYS.EMPRESTIMOS, INITIAL_EMPRESTIMOS);
  }

  public getEmprestimosComDetalhes(): EmprestimoComDetalhes[] {
    const emprestimos = this.getEmprestimos();
    const livros = this.getLivros();
    const leitores = this.getLeitores();
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return emprestimos.map((emp) => {
      const livro = livros.find((l) => l.id === emp.id_livro);
      const leitor = leitores.find((l) => l.id === emp.id_leitor);

      const dataDevPrevista = new Date(emp.data_devolucao_prevista + 'T00:00:00');
      const diffMs = dataDevPrevista.getTime() - hoje.getTime();
      const diasRestantes = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      const atrasado = emp.status !== 'devolvido' && diasRestantes < 0;

      return {
        ...emp,
        livro,
        leitor,
        dias_restantes: diasRestantes,
        atrasado,
      };
    });
  }

  public registrarEmprestimo(params: {
    id_leitor: string;
    id_livro: string;
    data_inicio?: string;
    observacoes?: string;
  }): { success: boolean; message?: string; emprestimo?: Emprestimo } {
    const config = this.getConfiguracao();
    const livros = this.getLivros();
    const livroIndex = livros.findIndex((l) => l.id === params.id_livro);

    if (livroIndex === -1) {
      return { success: false, message: 'Livro não encontrado no acervo.' };
    }

    const livro = livros[livroIndex];
    if (livro.quantidade_disponivel <= 0) {
      return { success: false, message: 'Não há exemplares deste livro disponíveis no momento.' };
    }

    const leitor = this.getLeitorById(params.id_leitor);
    if (!leitor) {
      return { success: false, message: 'Leitor não cadastrado.' };
    }

    // Regra: cada leitor pode emprestar até 3 livros simultâneos
    const activeLoans = this.getEmprestimos().filter(
      (e) => e.id_leitor === params.id_leitor && e.status !== 'devolvido'
    );
    if (activeLoans.length >= config.max_livros_mes) {
      return {
        success: false,
        message: `Limite de empréstimos atingido! O leitor já possui ${activeLoans.length} livros ativos (máximo permitido: ${config.max_livros_mes}).`,
      };
    }

    const dataInicioStr = params.data_inicio || new Date().toISOString().split('T')[0];
    const dataInicioDate = new Date(dataInicioStr + 'T00:00:00');
    // Prazo de devolução: exatamente 15 dias após o início
    const dataDevolucaoDate = new Date(dataInicioDate);
    dataDevolucaoDate.setDate(dataDevolucaoDate.getDate() + (config.prazo_dias || 15));
    const dataDevolucaoStr = dataDevolucaoDate.toISOString().split('T')[0];

    const novoEmprestimo: Emprestimo = {
      id: `emp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      id_leitor: params.id_leitor,
      id_livro: params.id_livro,
      data_inicio: dataInicioStr,
      data_devolucao_prevista: dataDevolucaoStr,
      status: 'ativo',
      observacoes: params.observacoes,
    };

    // Subtrair 1 exemplar disponível do livro
    livros[livroIndex].quantidade_disponivel = Math.max(0, livros[livroIndex].quantidade_disponivel - 1);
    this.set(STORAGE_KEYS.LIVROS, livros);

    const emprestimos = this.getEmprestimos();
    emprestimos.unshift(novoEmprestimo);
    this.set(STORAGE_KEYS.EMPRESTIMOS, emprestimos);

    return { success: true, emprestimo: novoEmprestimo };
  }

  public registrarDevolucao(idEmprestimo: string): { success: boolean; message?: string } {
    const emprestimos = this.getEmprestimos();
    const empIndex = emprestimos.findIndex((e) => e.id === idEmprestimo);
    if (empIndex === -1) {
      return { success: false, message: 'Empréstimo não encontrado.' };
    }

    const emprestimo = emprestimos[empIndex];
    if (emprestimo.status === 'devolvido') {
      return { success: false, message: 'Este empréstimo já foi dado como devolvido.' };
    }

    const livros = this.getLivros();
    const livroIndex = livros.findIndex((l) => l.id === emprestimo.id_livro);

    // Atualiza status e data de devolução real
    emprestimo.status = 'devolvido';
    emprestimo.data_devolucao_real = new Date().toISOString().split('T')[0];
    emprestimos[empIndex] = emprestimo;
    this.set(STORAGE_KEYS.EMPRESTIMOS, emprestimos);

    // Retorna o exemplar para o estoque disponível
    if (livroIndex >= 0) {
      livros[livroIndex].quantidade_disponivel = Math.min(
        livros[livroIndex].quantidade_total,
        livros[livroIndex].quantidade_disponivel + 1
      );
      this.set(STORAGE_KEYS.LIVROS, livros);
    }

    return { success: true };
  }

  public renovarEmprestimo(idEmprestimo: string): { success: boolean; message?: string } {
    const config = this.getConfiguracao();
    const emprestimos = this.getEmprestimos();
    const empIndex = emprestimos.findIndex((e) => e.id === idEmprestimo);
    if (empIndex === -1) {
      return { success: false, message: 'Empréstimo não encontrado.' };
    }

    const emprestimo = emprestimos[empIndex];
    if (emprestimo.status === 'devolvido') {
      return { success: false, message: 'Não é possível renovar um empréstimo já devolvido.' };
    }

    // Calcula nova data (+15 dias a partir da data prevista anterior ou de hoje)
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + (config.prazo_dias || 15));
    emprestimo.data_devolucao_prevista = baseDate.toISOString().split('T')[0];
    emprestimo.status = 'renovado';

    emprestimos[empIndex] = emprestimo;
    this.set(STORAGE_KEYS.EMPRESTIMOS, emprestimos);

    return { success: true };
  }

  // --- FUNCIONÁRIOS & CONTROLE DE ACESSO ---
  public getFuncionarios(): Funcionario[] {
    return this.get<Funcionario[]>(STORAGE_KEYS.FUNCIONARIOS, INITIAL_FUNCIONARIOS);
  }

  public saveFuncionario(funcionario: Omit<Funcionario, 'id'> & { id?: string }): Funcionario {
    const list = this.getFuncionarios();
    if (funcionario.id) {
      const idx = list.findIndex((f) => f.id === funcionario.id);
      if (idx >= 0) {
        const updated = { ...list[idx], ...funcionario, id: funcionario.id };
        list[idx] = updated;
        this.set(STORAGE_KEYS.FUNCIONARIOS, list);
        return updated;
      }
    }

    const newFunc: Funcionario = {
      ...funcionario,
      id: `usr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      criado_em: new Date().toISOString().split('T')[0],
      ativo: funcionario.ativo !== undefined ? funcionario.ativo : true,
    };
    list.push(newFunc);
    this.set(STORAGE_KEYS.FUNCIONARIOS, list);
    return newFunc;
  }

  public deleteFuncionario(id: string): { success: boolean; message?: string } {
    const list = this.getFuncionarios();
    const target = list.find((f) => f.id === id);
    if (!target) return { success: false, message: 'Usuário não encontrado.' };
    if (target.nivel_acesso === 'super_admin') {
      return { success: false, message: 'Não é permitido excluir o Super Admin do sistema.' };
    }
    const updated = list.filter((f) => f.id !== id);
    this.set(STORAGE_KEYS.FUNCIONARIOS, updated);
    return { success: true };
  }

  // --- AUTENTICAÇÃO E SESSÃO ---
  public autenticar(email: string, senhaPlana: string): { success: boolean; funcionario?: Funcionario; message?: string } {
    const list = this.getFuncionarios();
    const user = list.find((f) => f.email.toLowerCase() === email.trim().toLowerCase());

    if (!user) {
      return { success: false, message: 'E-mail não cadastrado ou inválido.' };
    }

    if (!user.ativo) {
      return { success: false, message: 'Usuário desativado. Contate o administrador.' };
    }

    // Direct match against senha_hash
    if (user.senha_hash !== senhaPlana.trim()) {
      return { success: false, message: 'Senha incorreta.' };
    }

    const sessionData = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      nivel_acesso: user.nivel_acesso,
      cargo: user.cargo,
      logged_at: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, JSON.stringify(sessionData));
    this.notify();

    return { success: true, funcionario: user };
  }

  public getSession(): Funcionario | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.AUTH_SESSION);
      if (!data) return null;
      const parsed = JSON.parse(data);
      const list = this.getFuncionarios();
      const current = list.find((f) => f.id === parsed.id && f.ativo);
      return current || null;
    } catch {
      return null;
    }
  }

  public logout(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    this.notify();
  }

  // --- REINICIALIZAÇÃO / BACKUP ---
  public resetToDefault(): void {
    localStorage.removeItem(STORAGE_KEYS.LIVROS);
    localStorage.removeItem(STORAGE_KEYS.AUTORES);
    localStorage.removeItem(STORAGE_KEYS.EDITORAS);
    localStorage.removeItem(STORAGE_KEYS.LEITORES);
    localStorage.removeItem(STORAGE_KEYS.FUNCIONARIOS);
    localStorage.removeItem(STORAGE_KEYS.EMPRESTIMOS);
    localStorage.removeItem(STORAGE_KEYS.CONFIGURACAO);
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    this.initStorage();
    this.notify();
  }

  public exportDataJson(): string {
    const exportObject = {
      configuracao: this.getConfiguracao(),
      livros: this.getLivros(),
      autores: this.getAutores(),
      editoras: this.getEditoras(),
      leitores: this.getLeitores(),
      funcionarios: this.getFuncionarios(),
      emprestimos: this.getEmprestimos(),
      exported_at: new Date().toISOString(),
    };
    return JSON.stringify(exportObject, null, 2);
  }

  public importDataJson(jsonStr: string): { success: boolean; message?: string } {
    try {
      const data = JSON.parse(jsonStr);
      if (data.configuracao) this.set(STORAGE_KEYS.CONFIGURACAO, data.configuracao);
      if (data.livros) this.set(STORAGE_KEYS.LIVROS, data.livros);
      if (data.autores) this.set(STORAGE_KEYS.AUTORES, data.autores);
      if (data.editoras) this.set(STORAGE_KEYS.EDITORAS, data.editoras);
      if (data.leitores) this.set(STORAGE_KEYS.LEITORES, data.leitores);
      if (data.funcionarios) this.set(STORAGE_KEYS.FUNCIONARIOS, data.funcionarios);
      if (data.emprestimos) this.set(STORAGE_KEYS.EMPRESTIMOS, data.emprestimos);
      this.notify();
      return { success: true };
    } catch (e: any) {
      return { success: false, message: e?.message || 'Arquivo JSON inválido.' };
    }
  }
}

export const db = new DatabaseService();
