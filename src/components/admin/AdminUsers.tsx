import React, { useState } from 'react';
import { Funcionario, NivelAcesso } from '../../types';
import {
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Lock,
  Mail,
  UserCheck,
  AlertTriangle,
  X,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';

interface AdminUsersProps {
  currentUser: Funcionario;
  funcionarios: Funcionario[];
  onSaveUser: (user: Omit<Funcionario, 'id'> & { id?: string }) => void;
  onDeleteUser: (id: string) => { success: boolean; message?: string };
}

export const AdminUsers: React.FC<AdminUsersProps> = ({
  currentUser,
  funcionarios,
  onSaveUser,
  onDeleteUser,
}) => {
  const isSuperAdmin = currentUser.nivel_acesso === 'super_admin';
  const isGerente = currentUser.nivel_acesso === 'gerente';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Funcionario | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nivelAcesso, setNivelAcesso] = useState<NivelAcesso>('funcionario');
  const [cargo, setCargo] = useState('Assistente de Acervo & Atendimento');
  const [ativo, setAtivo] = useState(true);

  const handleOpenCreate = () => {
    setEditingUser(null);
    setNome('');
    setEmail('');
    setSenha('');
    // Gerente can only create 'funcionario'. Super Admin can create 'gerente' or 'funcionario'
    setNivelAcesso('funcionario');
    setCargo('Assistente de Atendimento');
    setAtivo(true);
    setIsModalOpen(true);
    setFeedbackMsg(null);
  };

  const handleOpenEdit = (user: Funcionario) => {
    // Permission check: Gerente cannot edit Super Admin or other Gerentes
    if (isGerente && (user.nivel_acesso === 'super_admin' || user.nivel_acesso === 'gerente')) {
      setFeedbackMsg({
        type: 'error',
        text: 'Permissão negada: Gerentes só podem editar cadastros de Funcionários.',
      });
      return;
    }

    setEditingUser(user);
    setNome(user.nome);
    setEmail(user.email);
    setSenha(user.senha_hash);
    setNivelAcesso(user.nivel_acesso);
    setCargo(user.cargo);
    setAtivo(user.ativo);
    setIsModalOpen(true);
    setFeedbackMsg(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      setFeedbackMsg({ type: 'error', text: 'Preencha todos os campos obrigatórios.' });
      return;
    }

    // Strict hierarchy rule enforcement:
    if (isGerente && nivelAcesso !== 'funcionario') {
      setFeedbackMsg({
        type: 'error',
        text: 'Violação de Hierarquia: Gerentes só possuem permissão para criar e gerenciar Funcionários.',
      });
      return;
    }

    onSaveUser({
      id: editingUser ? editingUser.id : undefined,
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      senha_hash: senha.trim(),
      nivel_acesso: nivelAcesso,
      cargo: cargo.trim() || 'Atendente',
      ativo,
      criado_em: editingUser?.criado_em || new Date().toISOString().split('T')[0],
    });

    setIsModalOpen(false);
    setFeedbackMsg({
      type: 'success',
      text: editingUser ? 'Dados do membro da equipe atualizados!' : 'Novo membro cadastrado com sucesso!',
    });
  };

  const handleDelete = (user: Funcionario) => {
    if (user.nivel_acesso === 'super_admin') {
      setFeedbackMsg({ type: 'error', text: 'O Super Admin do sistema não pode ser removido.' });
      return;
    }

    if (isGerente && user.nivel_acesso === 'gerente') {
      setFeedbackMsg({
        type: 'error',
        text: 'Permissão negada: Gerentes não podem excluir outros Gerentes ou Super Admin.',
      });
      return;
    }

    const res = onDeleteUser(user.id);
    if (res.success) {
      setFeedbackMsg({ type: 'success', text: 'Membro removido da equipe com sucesso.' });
    } else {
      setFeedbackMsg({ type: 'error', text: res.message || 'Erro ao remover usuário.' });
    }
  };

  const roleBadges = {
    super_admin: { label: 'Super Admin', style: 'bg-purple-100 text-purple-800 border-purple-200' },
    gerente: { label: 'Gerente', style: 'bg-blue-100 text-blue-800 border-blue-200' },
    funcionario: { label: 'Funcionário', style: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Equipe da Biblioteca & Hierarquia de Acesso
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isSuperAdmin
              ? 'Você tem acesso total como Super Admin. Pode gerenciar Gerentes e Funcionários.'
              : 'Você está operando como Gerente. Pode gerenciar exclusivamente Funcionários.'}
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {isSuperAdmin ? 'Adicionar Membro (Gerente ou Funcionário)' : 'Adicionar Funcionário'}
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
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
          <button onClick={() => setFeedbackMsg(null)} className="text-xs font-bold hover:underline cursor-pointer">
            Fechar
          </button>
        </div>
      )}

      {/* Hierarchy Explanation Notice */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
        <div className="font-bold text-slate-900 flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-blue-600" />
          Regras da Hierarquia de Permissões:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] pt-1">
          <div className="p-2.5 rounded-lg bg-white border border-slate-200">
            <strong className="text-purple-800 block">1. Super Admin (Criador)</strong>
            Acesso total. Único com permissão para gerenciar Gerentes e editar Configurações da Biblioteca.
          </div>
          <div className="p-2.5 rounded-lg bg-white border border-slate-200">
            <strong className="text-blue-800 block">2. Gerente</strong>
            Gerencia Funcionários, Acervo, Leitores e Empréstimos. Não pode gerenciar Super Admin nem outros Gerentes.
          </div>
          <div className="p-2.5 rounded-lg bg-white border border-slate-200">
            <strong className="text-emerald-800 block">3. Funcionário</strong>
            Registra empréstimos, devoluções presenciais e cataloga livros no acervo. Não gerencia equipe.
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Nome & Cargo</th>
                <th className="py-3 px-4">E-mail Institucional</th>
                <th className="py-3 px-4 text-center">Nível de Acesso</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Data de Ingresso</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {funcionarios.map((user) => {
                const canManageThisUser =
                  isSuperAdmin || (isGerente && user.nivel_acesso === 'funcionario');

                return (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Nome & Cargo */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                        {user.nome}
                        {user.id === currentUser.id && (
                          <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                            Você
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500">{user.cargo}</div>
                    </td>

                    {/* Email */}
                    <td className="py-3 px-4 text-slate-600">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          roleBadges[user.nivel_acesso].style
                        }`}
                      >
                        {roleBadges[user.nivel_acesso].label}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                          user.ativo
                            ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                            : 'text-slate-500 bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {user.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>

                    {/* Data */}
                    <td className="py-3 px-4 text-center text-slate-500 tabular-nums">
                      {user.criado_em}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {canManageThisUser ? (
                        <>
                          <button
                            onClick={() => handleOpenEdit(user)}
                            className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                            title="Editar usuário"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {user.nivel_acesso !== 'super_admin' && (
                            <button
                              onClick={() => handleDelete(user)}
                              className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                              title="Remover da equipe"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">
                          Sem permissão
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingUser ? 'Editar Membro da Equipe' : 'Cadastrar Membro da Equipe'}
                </h3>
                <p className="text-xs text-slate-500">
                  Defina o cargo, credenciais e o nível hierárquico de acesso.
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
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Carlos Eduardo Mendes"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  E-mail Institucional *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@biblioteca.org"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Senha de Acesso *
                </label>
                <input
                  type="text"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Mínimo de 6 caracteres"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cargo na Biblioteca
                </label>
                <input
                  type="text"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  placeholder="Ex: Atendente de Balcão, Bibliotecário..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Hierarchy-aware Role Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nível de Acesso no Sistema *
                </label>
                <select
                  value={nivelAcesso}
                  onChange={(e) => setNivelAcesso(e.target.value as NivelAcesso)}
                  disabled={isGerente} // Gerentes can only create 'funcionario'
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="funcionario">Funcionário (Empréstimos e Acervo)</option>
                  {isSuperAdmin && <option value="gerente">Gerente (Acervo, Leitores e Funcionários)</option>}
                  {isSuperAdmin && editingUser?.nivel_acesso === 'super_admin' && (
                    <option value="super_admin">Super Admin (Acesso Total)</option>
                  )}
                </select>
                {isGerente && (
                  <p className="text-[11px] text-slate-500 mt-1">
                    Como Gerente, seu perfil permite cadastrar somente contas com nível Funcionário.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="user-active"
                  checked={ativo}
                  onChange={(e) => setAtivo(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="user-active" className="text-xs font-semibold text-slate-700 cursor-pointer">
                  Conta Ativa (Permite login)
                </label>
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
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs cursor-pointer"
                >
                  {editingUser ? 'Salvar Membro' : 'Criar Conta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
