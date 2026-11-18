import React from 'react';
import { Livro, Leitor, ConfiguracaoBiblioteca, EmprestimoComDetalhes } from '../../types';
import {
  BookOpen,
  ArrowRightLeft,
  AlertTriangle,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  ArrowUpRight,
  RotateCw,
  Coins,
} from 'lucide-react';
import { AdminTab } from './AdminHeader';

interface AdminDashboardProps {
  livros: Livro[];
  leitores: Leitor[];
  emprestimos: EmprestimoComDetalhes[];
  config: ConfiguracaoBiblioteca;
  onSelectTab: (tab: AdminTab) => void;
  onOpenNewLoan: () => void;
  onOpenNewBook: () => void;
  onOpenNewReader: () => void;
  onDevolver: (id: string) => void;
  onRenovar: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  livros,
  leitores,
  emprestimos,
  config,
  onSelectTab,
  onOpenNewLoan,
  onOpenNewBook,
  onOpenNewReader,
  onDevolver,
  onRenovar,
}) => {
  // Metric Calculations
  const totalTitulos = livros.length;
  const totalExemplares = livros.reduce((acc, cur) => acc + (cur.quantidade_total || 0), 0);
  const totalDisponiveis = livros.reduce((acc, cur) => acc + (cur.quantidade_disponivel || 0), 0);

  const emprestimosAtivos = emprestimos.filter((e) => e.status !== 'devolvido');
  const emprestimosAtrasados = emprestimosAtivos.filter((e) => e.atrasado);
  const emprestimosRenovados = emprestimos.filter((e) => e.status === 'renovado');

  const leitoresPagantes = leitores.filter((l) => l.ajuda_mensal_paga).length;
  const arrecadacaoMensal = leitoresPagantes * config.valor_ajuda_mensal;

  // Urgent attention: Overdue or due within 3 days
  const emprestimosUrgentes = emprestimosAtivos.filter((e) => e.atrasado || e.dias_restantes <= 3);

  return (
    <div className="space-y-8">
      {/* Welcome & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Visão Geral da Biblioteca Comunitária
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Controle de exemplares físicos, prazos de devolução de {config.prazo_dias} dias e gestão de leitores.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenNewLoan}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Novo Empréstimo
          </button>
          <button
            onClick={onOpenNewBook}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar Livro
          </button>
          <button
            onClick={onOpenNewReader}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Cadastrar Leitor
          </button>
        </div>
      </div>

      {/* Primary KPI Grid (Tabular Numerals & High Density) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Acervo Físico */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Acervo Físico</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {totalTitulos}
            </span>
            <span className="text-xs text-slate-500">títulos</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Total de exemplares:</span>
            <strong className="text-slate-700 tabular-nums font-semibold">{totalExemplares} cópias</strong>
          </div>
        </div>

        {/* Card 2: Exemplares Disponíveis na Estante */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Disponíveis na Estante</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-700 tabular-nums">
              {totalDisponiveis}
            </span>
            <span className="text-xs text-slate-500">livros físicos</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Em circulação:</span>
            <strong className="text-slate-700 tabular-nums font-semibold">
              {totalExemplares - totalDisponiveis} emprestados
            </strong>
          </div>
        </div>

        {/* Card 3: Empréstimos Ativos & Atrasos */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Empréstimos Ativos</span>
            <ArrowRightLeft className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {emprestimosAtivos.length}
            </span>
            <span className="text-xs text-slate-500">em andamento</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Atrasados ({'>'}15d):</span>
            <strong
              className={`tabular-nums font-semibold ${
                emprestimosAtrasados.length > 0 ? 'text-rose-600' : 'text-emerald-600'
              }`}
            >
              {emprestimosAtrasados.length} livros
            </strong>
          </div>
        </div>

        {/* Card 4: Leitores & Ajuda Solidária */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Leitores & Ajuda</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums">
              {leitores.length}
            </span>
            <span className="text-xs text-slate-500">cadastrados</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100 pt-2">
            <span>Ajuda mensal (R$ 3):</span>
            <strong className="text-slate-700 tabular-nums font-semibold">
              R$ {arrecadacaoMensal.toFixed(2).replace('.', ',')}
            </strong>
          </div>
        </div>
      </div>

      {/* Urgent Attention Alert Box (Overdue Loans) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-900">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Prazos de Devolução — Atrasados e Próximos do Vencimento
              </h3>
              <p className="text-xs text-slate-500">
                Lembre-se: o prazo regulamentar é de 15 dias para devolução ou renovação presencial.
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('emprestimos')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            Ver todos os empréstimos
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {emprestimosUrgentes.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
            Parabéns! Todos os empréstimos presenciais estão dentro do prazo de devolução de 15 dias.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Livro Físico</th>
                  <th className="py-3 px-4">Leitor</th>
                  <th className="py-3 px-4">Retirada</th>
                  <th className="py-3 px-4">Devolução Prevista</th>
                  <th className="py-3 px-4">Situação</th>
                  <th className="py-3 px-4 text-right">Ação Presencial</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {emprestimosUrgentes.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {emp.livro?.titulo || 'Livro não identificado'}
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      <div className="font-medium">{emp.leitor?.nome_completo || 'Leitor'}</div>
                      <div className="text-[11px] text-slate-400">{emp.leitor?.celular}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 tabular-nums">
                      {emp.data_inicio}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900 tabular-nums">
                      {emp.data_devolucao_prevista}
                    </td>
                    <td className="py-3 px-4">
                      {emp.atrasado ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          <AlertTriangle className="w-3 h-3" />
                          Atrasado ({Math.abs(emp.dias_restantes)} dias)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Clock className="w-3 h-3" />
                          Vence em {emp.dias_restantes} dias
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => onRenovar(emp.id)}
                        className="px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-colors inline-flex items-center gap-1 cursor-pointer"
                        title="Renovar por mais 15 dias"
                      >
                        <RotateCw className="w-3 h-3" />
                        Renovar +15d
                      </button>
                      <button
                        onClick={() => onDevolver(emp.id)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors inline-flex items-center gap-1 cursor-pointer"
                        title="Registrar devolução e recolocar livro no acervo"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Devolver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Community Loan Rules Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200 text-xs text-blue-900">
          <div className="font-bold flex items-center gap-1.5 mb-1">
            <BookOpen className="w-4 h-4 text-blue-700" />
            Regra de Até 3 Livros por Leitor
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            O sistema bloqueia tentativas de empréstimo quando o leitor já possui 3 livros ativos.
          </p>
        </div>

        <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 text-xs text-amber-900">
          <div className="font-bold flex items-center gap-1.5 mb-1">
            <Coins className="w-4 h-4 text-amber-700" />
            Ajuda Solidária: R$ {config.valor_ajuda_mensal.toFixed(2).replace('.', ',')}/mês
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            {leitoresPagantes} de {leitores.length} leitores em dia ({((leitoresPagantes / (leitores.length || 1)) * 100).toFixed(0)}%). Utilizada na compra de capas e restauro de exemplares.
          </p>
        </div>

        <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 text-xs text-emerald-900">
          <div className="font-bold flex items-center gap-1.5 mb-1">
            <Clock className="w-4 h-4 text-emerald-700" />
            Prazo de {config.prazo_dias} Dias
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            Calculado automaticamente a partir da data de início. Empréstimos renovados ganham +15 dias adicionais.
          </p>
        </div>
      </div>
    </div>
  );
};
