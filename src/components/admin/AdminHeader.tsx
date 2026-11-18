import React from 'react';
import { Funcionario, ConfiguracaoBiblioteca } from '../../types';
import {
  LayoutDashboard,
  BookMarked,
  ArrowRightLeft,
  Users,
  ShieldCheck,
  Settings,
  Eye,
  LogOut,
  Building2,
} from 'lucide-react';

export type AdminTab = 'dashboard' | 'livros' | 'emprestimos' | 'leitores' | 'usuarios' | 'configuracoes';

interface AdminHeaderProps {
  currentUser: Funcionario;
  config: ConfiguracaoBiblioteca;
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onLogout: () => void;
  onGoToPublic: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  currentUser,
  config,
  activeTab,
  onSelectTab,
  onLogout,
  onGoToPublic,
}) => {
  const isSuperAdmin = currentUser.nivel_acesso === 'super_admin';
  const isGerente = currentUser.nivel_acesso === 'gerente';
  const canManageUsers = isSuperAdmin || isGerente;

  // Role badge formatting
  const roleLabels = {
    super_admin: { label: 'Super Admin (Criador)', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    gerente: { label: 'Gerente da Biblioteca', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    funcionario: { label: 'Funcionário / Atendente', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  };

  const roleInfo = roleLabels[currentUser.nivel_acesso] || roleLabels.funcionario;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand & Library identification */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
            <Building2 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 leading-tight">
                Painel Administrativo
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${roleInfo.color}`}
              >
                {roleInfo.label}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 block truncate max-w-xs sm:max-w-md">
              {config.nome_biblioteca}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGoToPublic}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Visualizar a Vitrine Pública como leitor"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Ver Vitrine do Leitor</span>
          </button>

          <div className="text-right hidden md:block">
            <div className="text-xs font-semibold text-slate-900 leading-tight truncate max-w-[180px]">
              {currentUser.nome}
            </div>
            <div className="text-[10px] text-slate-400 truncate">{currentUser.email}</div>
          </div>

          <button
            onClick={onLogout}
            className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Sair do sistema (Logout)"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-bar Tabs */}
      <div className="border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-blue-600" />
            Dashboard
          </button>

          <button
            onClick={() => onSelectTab('livros')}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'livros'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookMarked className="w-4 h-4 text-amber-600" />
            Acervo de Livros
          </button>

          <button
            onClick={() => onSelectTab('emprestimos')}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'emprestimos'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
            Empréstimos Presenciais
          </button>

          <button
            onClick={() => onSelectTab('leitores')}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'leitores'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 text-indigo-600" />
            Leitores & LGPD
          </button>

          {/* Equipe / Usuários Tab (Super Admin and Gerente only) */}
          {canManageUsers && (
            <button
              onClick={() => onSelectTab('usuarios')}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'usuarios'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              Equipe & Permissões
            </button>
          )}

          {/* Configurações Tab (Super Admin ONLY) */}
          {isSuperAdmin && (
            <button
              onClick={() => onSelectTab('configuracoes')}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeTab === 'configuracoes'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4 text-slate-700" />
              Configurações & Licença
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
