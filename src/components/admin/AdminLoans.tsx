import React, { useState } from 'react';
import { Livro, Leitor, EmprestimoComDetalhes, ConfiguracaoBiblioteca } from '../../types';
import {
  Plus,
  Search,
  ArrowRightLeft,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  BookOpen,
  User,
  X,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

interface AdminLoansProps {
  emprestimos: EmprestimoComDetalhes[];
  livros: Livro[];
  leitores: Leitor[];
  config: ConfiguracaoBiblioteca;
  onRegistrarEmprestimo: (params: {
    id_leitor: string;
    id_livro: string;
    data_inicio?: string;
    observacoes?: string;
  }) => { success: boolean; message?: string };
  onDevolver: (id: string) => { success: boolean; message?: string };
  onRenovar: (id: string) => { success: boolean; message?: string };
}

export const AdminLoans: React.FC<AdminLoansProps> = ({
  emprestimos,
  livros,
  leitores,
  config,
  onRegistrarEmprestimo,
  onDevolver,
  onRenovar,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'ativos' | 'renovados' | 'atrasados' | 'devolvidos'>('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [selectedLivroId, setSelectedLivroId] = useState('');
  const [selectedLeitorId, setSelectedLeitorId] = useState('');
  const [dataInicio, setDataInicio] = useState(new Date().toISOString().split('T')[0]);
  const [observacoes, setObservacoes] = useState('');

  // Calculate 15 days ahead for display
  const calculatedDueDate = React.useMemo(() => {
    try {
      const d = new Date(dataInicio + 'T00:00:00');
      d.setDate(d.getDate() + (config.prazo_dias || 15));
      return d.toISOString().split('T')[0];
    } catch {
      return '';
    }
  }, [dataInicio, config.prazo_dias]);

  // Selected leitor active loans validation
  const selectedLeitor = leitores.find((l) => l.id === selectedLeitorId);
  const activeLoansOfSelectedLeitor = emprestimos.filter(
    (e) => e.id_leitor === selectedLeitorId && e.status !== 'devolvido'
  );
  const isLeitorLimitReached = activeLoansOfSelectedLeitor.length >= config.max_livros_mes;

  // Selected book availability check
  const selectedLivro = livros.find((l) => l.id === selectedLivroId);
  const isLivroUnavailable = selectedLivro ? selectedLivro.quantidade_disponivel <= 0 : false;

  const handleOpenCreateModal = () => {
    // Find first available book and first reader
    const firstAvailBook = livros.find((l) => l.quantidade_disponivel > 0);
    setSelectedLivroId(firstAvailBook ? firstAvailBook.id : '');
    setSelectedLeitorId(leitores.length > 0 ? leitores[0].id : '');
    setDataInicio(new Date().toISOString().split('T')[0]);
    setObservacoes('');
    setIsModalOpen(true);
    setFeedbackMsg(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLivroId || !selectedLeitorId) {
      setFeedbackMsg({ type: 'error', text: 'Selecione um livro e um leitor.' });
      return;
    }

    if (isLeitorLimitReached) {
      setFeedbackMsg({
        type: 'error',
        text: `Limite atingido! O leitor já possui ${activeLoansOfSelectedLeitor.length} livros físicos retirados.`,
      });
      return;
    }

    if (isLivroUnavailable) {
      setFeedbackMsg({
        type: 'error',
        text: 'Não há exemplares deste livro disponíveis no momento na biblioteca.',
      });
      return;
    }

    const res = onRegistrarEmprestimo({
      id_livro: selectedLivroId,
      id_leitor: selectedLeitorId,
      data_inicio: dataInicio,
      observacoes: observacoes.trim() || undefined,
    });

    if (res.success) {
      setIsModalOpen(false);
      setFeedbackMsg({ type: 'success', text: 'Empréstimo registrado com sucesso! Devolução agendada para 15 dias.' });
    } else {
      setFeedbackMsg({ type: 'error', text: res.message || 'Erro ao registrar empréstimo.' });
    }
  };

  // Filtered loans list
  const filteredEmprestimos = emprestimos.filter((emp) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchLivro = emp.livro?.titulo.toLowerCase().includes(q);
      const matchLeitor = emp.leitor?.nome_completo.toLowerCase().includes(q);
      const matchObserv = emp.observacoes?.toLowerCase().includes(q);
      if (!matchLivro && !matchLeitor && !matchObserv) return false;
    }

    if (statusFilter === 'ativos' && emp.status === 'devolvido') return false;
    if (statusFilter === 'renovados' && emp.status !== 'renovado') return false;
    if (statusFilter === 'atrasados' && (!emp.atrasado || emp.status === 'devolvido')) return false;
    if (statusFilter === 'devolvidos' && emp.status !== 'devolvido') return false;

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & New Loan CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Gestão de Empréstimos Presenciais
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Prazo obrigatório de {config.prazo_dias} dias · Máximo de {config.max_livros_mes} livros por leitor cadastrado.
          </p>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Registrar Saída de Livro
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
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por livro, leitor ou nota..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setStatusFilter('todos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              statusFilter === 'todos' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todos ({emprestimos.length})
          </button>
          <button
            onClick={() => setStatusFilter('ativos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              statusFilter === 'ativos' ? 'bg-white text-blue-700 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ativos
          </button>
          <button
            onClick={() => setStatusFilter('renovados')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              statusFilter === 'renovados' ? 'bg-white text-indigo-700 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Renovados
          </button>
          <button
            onClick={() => setStatusFilter('atrasados')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              statusFilter === 'atrasados' ? 'bg-white text-rose-700 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Atrasados
          </button>
          <button
            onClick={() => setStatusFilter('devolvidos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
              statusFilter === 'devolvidos' ? 'bg-white text-emerald-700 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Devolvidos
          </button>
        </div>
      </div>

      {/* Loans Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Livro Emprestado</th>
                <th className="py-3 px-4">Leitor Presencial</th>
                <th className="py-3 px-4">Data Início</th>
                <th className="py-3 px-4">Prazo Previsto (15d)</th>
                <th className="py-3 px-4">Status & Situação</th>
                <th className="py-3 px-4">Observações</th>
                <th className="py-3 px-4 text-right">Ações no Balcão</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmprestimos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Nenhum empréstimo encontrado para o filtro selecionado.
                  </td>
                </tr>
              ) : (
                filteredEmprestimos.map((emp) => {
                  const isDevolvido = emp.status === 'devolvido';
                  return (
                    <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Livro */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 text-xs sm:text-sm">
                          {emp.livro?.titulo || 'Livro ID: ' + emp.id_livro}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {emp.livro?.autor} · {emp.livro?.categoria}
                        </div>
                      </td>

                      {/* Leitor */}
                      <td className="py-3 px-4 text-slate-700">
                        <div className="font-semibold text-slate-900">
                          {emp.leitor?.nome_completo || 'Leitor ID: ' + emp.id_leitor}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {emp.leitor?.escola || emp.leitor?.escolaridade} · Cel: {emp.leitor?.celular}
                        </div>
                      </td>

                      {/* Data Início */}
                      <td className="py-3 px-4 text-slate-600 tabular-nums">
                        {emp.data_inicio}
                      </td>

                      {/* Data Devolução Prevista */}
                      <td className="py-3 px-4 tabular-nums">
                        <div className="font-semibold text-slate-900">
                          {emp.data_devolucao_prevista}
                        </div>
                        {isDevolvido && emp.data_devolucao_real && (
                          <div className="text-[10px] text-emerald-600">
                            Entregue: {emp.data_devolucao_real}
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        {isDevolvido ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Devolvido
                          </span>
                        ) : emp.atrasado ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            Atrasado ({Math.abs(emp.dias_restantes)} dias)
                          </span>
                        ) : emp.status === 'renovado' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                            <RotateCw className="w-3.5 h-3.5 text-indigo-600" />
                            Renovado ({emp.dias_restantes}d restantes)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                            Ativo ({emp.dias_restantes}d restantes)
                          </span>
                        )}
                      </td>

                      {/* Observações */}
                      <td className="py-3 px-4 text-slate-500 text-[11px] max-w-xs truncate">
                        {emp.observacoes || '—'}
                      </td>

                      {/* Ações */}
                      <td className="py-3 px-4 text-right whitespace-nowrap space-x-1.5">
                        {!isDevolvido ? (
                          <>
                            <button
                              onClick={() => {
                                const res = onRenovar(emp.id);
                                if (res.success) {
                                  setFeedbackMsg({ type: 'success', text: 'Prazo renovado por mais 15 dias com sucesso!' });
                                } else {
                                  setFeedbackMsg({ type: 'error', text: res.message || 'Erro ao renovar.' });
                                }
                              }}
                              className="px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors inline-flex items-center gap-1 cursor-pointer"
                              title="Renovar por mais 15 dias"
                            >
                              <RotateCw className="w-3 h-3 text-indigo-600" />
                              Renovar
                            </button>
                            <button
                              onClick={() => {
                                const res = onDevolver(emp.id);
                                if (res.success) {
                                  setFeedbackMsg({ type: 'success', text: 'Devolução registrada e exemplar recolocado na estante!' });
                                } else {
                                  setFeedbackMsg({ type: 'error', text: res.message || 'Erro ao devolver.' });
                                }
                              }}
                              className="px-2.5 py-1 text-[11px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors inline-flex items-center gap-1 cursor-pointer"
                              title="Registrar devolução presencial"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              Devolver
                            </button>
                          </>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium italic">
                            Encerrado
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Registrar Novo Empréstimo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Registrar Saída de Livro (Empréstimo Presencial)
                </h3>
                <p className="text-xs text-slate-500">
                  Preencha o leitor e o livro físico retirado no balcão da biblioteca.
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
              {/* Leitor Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Leitor Cadastrado *
                </label>
                <select
                  required
                  value={selectedLeitorId}
                  onChange={(e) => setSelectedLeitorId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Selecione o leitor...</option>
                  {leitores.map((lei) => {
                    const activeCount = emprestimos.filter((e) => e.id_leitor === lei.id && e.status !== 'devolvido').length;
                    return (
                      <option key={lei.id} value={lei.id}>
                        {lei.nome_completo} ({lei.escola || lei.escolaridade}) — {activeCount}/3 livros ativos
                        {!lei.ajuda_mensal_paga ? ' [Ajuda R$ 3 Pendente]' : ''}
                      </option>
                    );
                  })}
                </select>

                {/* Leitor validation message */}
                {selectedLeitor && (
                  <div className="mt-2 text-[11px] p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Livros ativos emprestados:</span>
                      <strong className={`font-semibold ${isLeitorLimitReached ? 'text-rose-600' : 'text-slate-900'}`}>
                        {activeLoansOfSelectedLeitor.length} de {config.max_livros_mes} livros permitidos
                      </strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Contribuição mensal (R$ 3,00):</span>
                      <span className={`font-semibold ${selectedLeitor.ajuda_mensal_paga ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {selectedLeitor.ajuda_mensal_paga ? '✓ Em dia' : '⚠ Pendente'}
                      </span>
                    </div>
                    {isLeitorLimitReached && (
                      <div className="text-rose-600 font-bold text-[11px] pt-1">
                        Atenção: O leitor atingiu o limite de 3 livros simultâneos. É necessário devolver um exemplar antes de novo empréstimo.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Livro Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Livro do Acervo Físico *
                </label>
                <select
                  required
                  value={selectedLivroId}
                  onChange={(e) => setSelectedLivroId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Selecione o livro...</option>
                  {livros.map((liv) => (
                    <option key={liv.id} value={liv.id} disabled={liv.quantidade_disponivel <= 0}>
                      {liv.titulo} — {liv.autor} [{liv.quantidade_disponivel} na estante / {liv.quantidade_total} total]
                      {liv.quantidade_disponivel <= 0 ? ' (ESGOTADO)' : ''}
                    </option>
                  ))}
                </select>

                {selectedLivro && (
                  <div className="mt-2 text-[11px] flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="text-slate-600">Disponibilidade atual na estante:</span>
                    <strong className={selectedLivro.quantidade_disponivel > 0 ? 'text-emerald-700' : 'text-rose-600'}>
                      {selectedLivro.quantidade_disponivel} cópias disponíveis
                    </strong>
                  </div>
                )}
              </div>

              {/* Data Início & Automatic Due Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Data de Início (Hoje) *
                  </label>
                  <input
                    type="date"
                    required
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Data de Devolução Prevista ({config.prazo_dias} dias)
                  </label>
                  <div className="w-full px-3 py-2 text-xs font-bold text-slate-900 border border-slate-200 rounded-lg bg-slate-100 flex items-center justify-between">
                    <span>{calculatedDueDate}</span>
                    <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                      Auto (+{config.prazo_dias}d)
                    </span>
                  </div>
                </div>
              </div>

              {/* Observações */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Observações / Finalidade (Opcional)
                </label>
                <input
                  type="text"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Ex: Trabalho de biologia, preparatório Fuvest, leitura de férias..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                  disabled={isLeitorLimitReached || isLivroUnavailable}
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs disabled:opacity-50 cursor-pointer"
                >
                  Confirmar Empréstimo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
