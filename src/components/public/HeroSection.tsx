import React from 'react';
import { Search, MapPin, Calendar, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { ConfiguracaoBiblioteca } from '../../types';

interface HeroSectionProps {
  config: ConfiguracaoBiblioteca;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  gondolaFilter: 'todas' | 'Ler' | 'Estudar';
  onGondolaChange: (val: 'todas' | 'Ler' | 'Estudar') => void;
  disponibilidadeFilter: 'todos' | 'disponiveis' | 'indisponiveis';
  onDisponibilidadeChange: (val: 'todos' | 'disponiveis' | 'indisponiveis') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  searchTerm,
  onSearchChange,
  gondolaFilter,
  onGondolaChange,
  disponibilidadeFilter,
  onDisponibilidadeChange,
}) => {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background with Generated Library Photography & Subtle Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_community_library_1793967522648.jpg"
          alt="Espaço da Biblioteca Comunitária"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/85 to-slate-900/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-3xl">
          {/* Subtitle / Kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 uppercase tracking-wider mb-4 bg-blue-950/70 px-3 py-1.5 rounded-md border border-blue-800/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            Vitrine Oficial de Consulta do Acervo Físico
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight text-balance">
            {config.nome_biblioteca}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed text-balance">
            {config.slogan}. Esta vitrine serve exclusivamente para você verificar a disponibilidade dos livros físicos em tempo real antes de se deslocar até a nossa sede.
          </p>

          {/* Search Box */}
          <div className="bg-white p-2 rounded-xl shadow-xl flex flex-col sm:flex-row gap-2 border border-slate-200">
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar por título, autor, editora ou assunto..."
                className="w-full pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none rounded-lg"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="mr-2 text-xs text-slate-400 hover:text-slate-600 px-2 py-1 rounded bg-slate-100"
                >
                  Limpar
                </button>
              )}
            </div>
            <a
              href="#gondolas"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center shrink-0 shadow-sm"
            >
              Ver na Estante
            </a>
          </div>

          {/* Quick Filter Controls */}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="text-slate-400 font-medium">Gôndola:</span>
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => onGondolaChange('todas')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  gondolaFilter === 'todas'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => onGondolaChange('Ler')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  gondolaFilter === 'Ler'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                📖 Ler (Literatura)
              </button>
              <button
                onClick={() => onGondolaChange('Estudar')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  gondolaFilter === 'Estudar'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                🎓 Estudar (Didáticos & Ciências)
              </button>
            </div>

            <span className="text-slate-400 font-medium ml-2">Status:</span>
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => onDisponibilidadeChange('todos')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  disponibilidadeFilter === 'todos'
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => onDisponibilidadeChange('disponiveis')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  disponibilidadeFilter === 'disponiveis'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Disponíveis
              </button>
              <button
                onClick={() => onDisponibilidadeChange('indisponiveis')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  disponibilidadeFilter === 'indisponiveis'
                    ? 'bg-rose-600 text-white font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Emprestados
              </button>
            </div>
          </div>
        </div>

        {/* 3 Physical Community Trust Markers */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-blue-900/50 text-blue-400 shrink-0 border border-blue-700/40">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Retirada Presencial</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {config.endereco}, {config.bairro} — venha retirar pessoalmente.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-blue-900/50 text-blue-400 shrink-0 border border-blue-700/40">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Prazo de {config.prazo_dias} Dias</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Até {config.max_livros_mes} livros físicos simultâneos por leitor cadastrado.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-blue-900/50 text-blue-400 shrink-0 border border-blue-700/40">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Ajuda Solidária R$ {config.valor_ajuda_mensal.toFixed(2).replace('.', ',')}/mês</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Contribuição simbólica para manutenção e conservação dos exemplares.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
