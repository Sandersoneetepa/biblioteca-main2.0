import React from 'react';
import { BookOpen, ShieldCheck, Lock, MapPin, Heart } from 'lucide-react';
import { ConfiguracaoBiblioteca } from '../../types';

interface PublicFooterProps {
  config: ConfiguracaoBiblioteca;
  onOpenPrivacy: () => void;
  onGoToAdmin: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({
  config,
  onOpenPrivacy,
  onGoToAdmin,
  onScrollToSection,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 text-white mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-base tracking-tight">
                {config.nome_biblioteca}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
              {config.slogan}. Incentivando o hábito da leitura, a pesquisa escolar e o fortalecimento de laços comunitários através do acesso democrático aos livros físicos.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{config.endereco} — {config.cidade_uf}</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Vitrine & Consulta
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onScrollToSection('gondolas')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gôndola &quot;Ler&quot; (Literatura)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('gondolas')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gôndola &quot;Estudar&quot; (Ciências & Apoio)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('como-funciona')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Regras de Empréstimo Presencial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('localizacao')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Horários & Localização
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Discreet Admin Gateway */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Privacidade & Gestão
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Respeitamos integralmente a Lei Geral de Proteção de Dados (LGPD). Os dados de alunos e leitores são estritamente confidenciais.
            </p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={onOpenPrivacy}
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer text-left"
              >
                <ShieldCheck className="w-4 h-4" />
                Política de Privacidade & Termos LGPD
              </button>
              <div className="pt-2">
                <button
                  onClick={onGoToAdmin}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  Área Restrita da Equipe (/admin)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>Desenvolvido com</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>para a Comunidade · Sem fins lucrativos</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Retirada e devolução 100% presenciais</span>
            <span aria-hidden="true">·</span>
            <span>Versão Acervo 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
