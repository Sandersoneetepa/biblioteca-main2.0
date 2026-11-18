import React, { useState } from 'react';
import { Leitor, EmprestimoComDetalhes, ConfiguracaoBiblioteca } from '../../types';
import {
  Plus,
  Search,
  ShieldCheck,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
  Coins,
  BookOpen,
} from 'lucide-react';

interface AdminReadersProps {
  leitores: Leitor[];
  emprestimos: EmprestimoComDetalhes[];
  config: ConfiguracaoBiblioteca;
  onSaveReader: (reader: Omit<Leitor, 'id'> & { id?: string }) => void;
  onDeleteReader: (id: string) => { success: boolean; message?: string };
}

export const AdminReaders: React.FC<AdminReadersProps> = ({
  leitores,
  emprestimos,
  config,
  onSaveReader,
  onDeleteReader,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReader, setEditingReader] = useState<Leitor | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [idade, setIdade] = useState(16);
  const [escolaridade, setEscolaridade] = useState('Ensino Médio');
  const [escola, setEscola] = useState('');
  const [endereco, setEndereco] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');
  const [ajudaMensalPaga, setAjudaMensalPaga] = useState(true);
  // CRITICAL LGPD REQUIREMENT: Checkbox must NOT be pre-checked!
  const [consentimentoLgpd, setConsentimentoLgpd] = useState(false);

  const handleOpenCreate = () => {
    setEditingReader(null);
    setNomeCompleto('');
    setIdade(16);
    setEscolaridade('Ensino Médio');
    setEscola('');
    setEndereco('');
    setCelular('');
    setEmail('');
    setAjudaMensalPaga(true);
    setConsentimentoLgpd(false); // MUST be false by default
    setIsModalOpen(true);
    setFeedbackMsg(null);
  };

  const handleOpenEdit = (reader: Leitor) => {
    setEditingReader(reader);
    setNomeCompleto(reader.nome_completo);
    setIdade(reader.idade);
    setEscolaridade(reader.escolaridade);
    setEscola(reader.escola);
    setEndereco(reader.endereco);
    setCelular(reader.celular);
    setEmail(reader.email);
    setAjudaMensalPaga(reader.ajuda_mensal_paga);
    setConsentimentoLgpd(true); // Existing consent confirmed
    setIsModalOpen(true);
    setFeedbackMsg(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeCompleto.trim() || !celular.trim()) {
      setFeedbackMsg({ type: 'error', text: 'Preencha ao menos o nome completo e o celular do leitor.' });
      return;
    }

    if (!consentimentoLgpd) {
      setFeedbackMsg({
        type: 'error',
        text: 'O consentimento expresso aos termos da LGPD é obrigatório para cadastrar o leitor presencialmente.',
      });
      return;
    }

    onSaveReader({
      id: editingReader ? editingReader.id : undefined,
      nome_completo: nomeCompleto.trim(),
      idade: Number(idade) || 16,
      escolaridade: escolaridade.trim(),
      escola: escola.trim() || 'Comunidade em geral',
      endereco: endereco.trim() || 'Não informado',
      celular: celular.trim(),
      email: email.trim() || 'sem-email@comunidade.org',
      ajuda_mensal_paga: ajudaMensalPaga,
      data_cadastro: editingReader?.data_cadastro || new Date().toISOString().split('T')[0],
      data_consentimento_lgpd: editingReader?.data_consentimento_lgpd || new Date().toISOString(),
    });

    setIsModalOpen(false);
    setFeedbackMsg({
      type: 'success',
      text: editingReader ? 'Cadastro do leitor atualizado com sucesso!' : 'Novo leitor cadastrado com consentimento LGPD registrado!',
    });
  };

  const handleDelete = (id: string) => {
    const res = onDeleteReader(id);
    if (res.success) {
      setFeedbackMsg({ type: 'success', text: 'Leitor removido do cadastro com sucesso.' });
    } else {
      setFeedbackMsg({ type: 'error', text: res.message || 'Erro ao remover leitor.' });
    }
  };

  const filteredLeitores = leitores.filter((lei) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      lei.nome_completo.toLowerCase().includes(q) ||
      lei.escola.toLowerCase().includes(q) ||
      lei.celular.includes(q) ||
      lei.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Gestão de Leitores (Alunos & Comunidade)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Cadastros presenciais em conformidade estrita com a LGPD (Lei nº 13.709/2018). Dados protegidos e invisíveis no site público.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Cadastrar Novo Leitor
        </button>
      </div>

      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedbackMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
          <button onClick={() => setFeedbackMsg(null)} className="text-xs font-bold hover:underline cursor-pointer">
            Fechar
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, escola, celular..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-xs text-slate-500 tabular-nums">
          Total: <strong className="text-slate-900">{filteredLeitores.length}</strong> leitores
        </div>
      </div>

      {/* Readers Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Leitor & Escola</th>
                <th className="py-3 px-4">Idade & Escolaridade</th>
                <th className="py-3 px-4">Contato & Endereço</th>
                <th className="py-3 px-4 text-center">Ajuda Mensal (R$ 3)</th>
                <th className="py-3 px-4 text-center">Livros em Posse</th>
                <th className="py-3 px-4 text-center">Consentimento LGPD</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeitores.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Nenhum leitor cadastrado.
                  </td>
                </tr>
              ) : (
                filteredLeitores.map((lei) => {
                  const activeLoans = emprestimos.filter(
                    (e) => e.id_leitor === lei.id && e.status !== 'devolvido'
                  );
                  return (
                    <tr key={lei.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Nome & Escola */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">
                          {lei.nome_completo}
                        </div>
                        <div className="text-[11px] text-slate-500">{lei.escola}</div>
                      </td>

                      {/* Idade & Escolaridade */}
                      <td className="py-3 px-4 text-slate-700">
                        <div className="tabular-nums font-semibold">{lei.idade} anos</div>
                        <div className="text-[11px] text-slate-400">{lei.escolaridade}</div>
                      </td>

                      {/* Contato & Endereço */}
                      <td className="py-3 px-4 text-slate-700">
                        <div className="font-semibold text-slate-900">{lei.celular}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-xs">
                          {lei.endereco}
                        </div>
                      </td>

                      {/* Ajuda Mensal (R$ 3,00) */}
                      <td className="py-3 px-4 text-center">
                        {lei.ajuda_mensal_paga ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Pago (R$ 3,00)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            <Coins className="w-3.5 h-3.5 text-amber-600" />
                            Pendente
                          </span>
                        )}
                      </td>

                      {/* Livros em Posse */}
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full font-bold tabular-nums text-xs ${
                            activeLoans.length >= config.max_livros_mes
                              ? 'bg-rose-100 text-rose-800'
                              : activeLoans.length > 0
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {activeLoans.length} / {config.max_livros_mes} livros
                        </span>
                      </td>

                      {/* Consentimento LGPD (Mandatory timestamp) */}
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>Consentido</span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 tabular-nums">
                          {lei.data_consentimento_lgpd ? lei.data_consentimento_lgpd.split('T')[0] : 'Presencial'}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEdit(lei)}
                          className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                          title="Editar cadastro do leitor"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(lei.id)}
                          className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                          title="Excluir leitor (caso sem livros pendentes)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reader Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingReader ? 'Editar Cadastro do Leitor' : 'Novo Cadastro Presencial de Leitor'}
                </h3>
                <p className="text-xs text-slate-500">
                  Coleta presencial de dados com termo de consentimento obrigatório da LGPD.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome Completo do Leitor *
                  </label>
                  <input
                    type="text"
                    required
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
                    placeholder="Ex: Beatriz Vasconcelos de Souza"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Idade *
                  </label>
                  <input
                    type="number"
                    min="4"
                    max="110"
                    required
                    value={idade}
                    onChange={(e) => setIdade(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Escolaridade *
                  </label>
                  <select
                    value={escolaridade}
                    onChange={(e) => setEscolaridade(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Ensino Fundamental I">Ensino Fundamental I</option>
                    <option value="Ensino Fundamental II">Ensino Fundamental II</option>
                    <option value="Ensino Médio">Ensino Médio</option>
                    <option value="Ensino Técnico">Ensino Técnico</option>
                    <option value="Ensino Superior">Ensino Superior</option>
                    <option value="Outro / Comunidade">Outro / Comunidade em Geral</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Escola / Instituição de Ensino
                  </label>
                  <input
                    type="text"
                    value={escola}
                    onChange={(e) => setEscola(e.target.value)}
                    placeholder="Ex: E.E. Professora Maria Montessori ou Comunidade"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Celular / WhatsApp para Avisos de Prazo *
                  </label>
                  <input
                    type="text"
                    required
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                    placeholder="(11) 98765-4321"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    E-mail do Leitor (ou Responsável)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="leitor@email.com"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Endereço Completo
                  </label>
                  <input
                    type="text"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    placeholder="Rua, Número, Bairro e Ponto de Referência"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Ajuda Mensal Solidária (R$ 3,00) */}
                <div className="sm:col-span-2 bg-amber-50/70 p-3.5 rounded-xl border border-amber-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-950 block">
                        Contribuição Solidária Mensal (R$ {config.valor_ajuda_mensal.toFixed(2).replace('.', ',')})
                      </span>
                      <span className="text-[11px] text-amber-800">
                        Ajuda simbólica destinada à manutenção, conservação e reposição de livros da biblioteca.
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={ajudaMensalPaga}
                        onChange={(e) => setAjudaMensalPaga(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                      <span className="ml-2 text-xs font-semibold text-slate-800">
                        {ajudaMensalPaga ? 'Pago' : 'Pendente'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* CRITICAL LGPD CONSENT REQUIREMENT: Mandatory Unchecked Checkbox */}
                <div className="sm:col-span-2 bg-blue-50/80 p-4 rounded-xl border border-blue-200 text-slate-800">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="lgpd-consent-check"
                      checked={consentimentoLgpd}
                      onChange={(e) => setConsentimentoLgpd(e.target.checked)}
                      className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <label htmlFor="lgpd-consent-check" className="text-xs leading-relaxed cursor-pointer select-none">
                      <strong className="text-blue-900 block font-bold mb-1">
                        Termo Obrigatório de Consentimento LGPD (Lei nº 13.709/2018) *
                      </strong>
                      Declaro que o leitor (ou seu responsável legal, em caso de menor de idade) foi informado presencialmente e <strong>consentiu de forma livre, inequívoca e expressa</strong> com o armazenamento e tratamento dos seus dados cadastrais única e exclusivamente para controle de acervo e empréstimo físico na Biblioteca Comunitária.
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!consentimentoLgpd}
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs disabled:opacity-50 cursor-pointer"
                >
                  {editingReader ? 'Salvar Cadastro' : 'Confirmar e Cadastrar Leitor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
