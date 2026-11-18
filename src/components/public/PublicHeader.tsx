import React from 'react';
import { BookOpen, MapPin, Clock, ShieldCheck, ShieldAlert } from 'lucide-react';
import { ConfiguracaoBiblioteca } from '../../types';

interface PublicHeaderProps {
  config: ConfiguracaoBiblioteca;
  onOpenPrivacy: () => void;
  onGoToAdmin: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({
  config,
  onOpenPrivacy,
  onGoToAdmin,
  onScrollToSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice for Physical-Only Library */}
      <div className="bg-slate-900 text-slate-100 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 max-w-4xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold text-amber-300">Aviso Importante:</span>
            <span className="truncate">
              Biblioteca física e presencial. Não realizamos reservas nem entregas online. Consulte a disponibilidade e venha nos visitar!
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-slate-300 shrink-0 text-[11px]">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {config.horario_funcionamento}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {config.bairro}, {config.cidade_uf}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark / Brand */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-slate-900 hover:text-blue-900 transition-colors whitespace-nowrap shrink-0 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight">
              {config.nome_biblioteca.replace('Biblioteca Comunitária ', '') || 'BiblioComunidade'}
            </span>
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
              Biblioteca Comunitária Física
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onScrollToSection('gondolas')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Estante & Gôndolas
          </button>
          <button
            onClick={() => onScrollToSection('como-funciona')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Como Funciona
          </button>
          <button
            onClick={() => onScrollToSection('localizacao')}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Endereço & Contato
          </button>
          <button
            onClick={onOpenPrivacy}
            className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Privacidade & LGPD
          </button>
        </nav>

        {/* Zone 3: Primary Action & Discreet Admin Gateway */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onScrollToSection('gondolas')}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
          >
            Consultar Acervo
          </button>
          <button
            onClick={onGoToAdmin}
            title="Acesso restrito para funcionários e gerência"
            className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 border border-slate-200"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Painel /admin</span>
            <span className="sm:hidden">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};
