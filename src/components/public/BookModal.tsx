import React from 'react';
import { Livro, ConfiguracaoBiblioteca } from '../../types';
import { X, CheckCircle2, XCircle, MapPin, Calendar, Clock, BookOpen, AlertCircle } from 'lucide-react';

interface BookModalProps {
  livro: Livro | null;
  config: ConfiguracaoBiblioteca;
  onClose: () => void;
}

export const BookModal: React.FC<BookModalProps> = ({ livro, config, onClose }) => {
  if (!livro) return null;

  const isDisponivel = livro.quantidade_disponivel > 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fechar janela de detalhes"
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-700 bg-white/80 hover:bg-white rounded-full transition-colors shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Big Cover Display */}
          <div className="md:col-span-5 bg-slate-100 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
            <div className="w-full max-w-[240px] aspect-[3/4] rounded-lg shadow-lg overflow-hidden border border-slate-300 bg-slate-900 relative">
              {livro.capa_url ? (
                <img
                  src={livro.capa_url}
                  alt={livro.titulo}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full p-4 flex flex-col justify-between text-white">
                  <BookOpen className="w-8 h-8 text-blue-400" />
                  <span className="font-serif-title text-base font-bold">{livro.titulo}</span>
                  <span className="text-xs text-slate-400">{livro.autor}</span>
                </div>
              )}
            </div>

            {/* Shelf badge */}
            <div className="mt-4 text-center">
              <span className="text-xs font-semibold text-slate-600 bg-slate-200/80 px-3 py-1 rounded-full">
                Estante: Gôndola {livro.gondola === 'Ler' ? 'Ler (Literatura)' : 'Estudar (Didáticos)'}
              </span>
            </div>
          </div>

          {/* Right Column: Book Information & In-Person Availability */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Unboxed Metadata */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-2">
                <span className="font-semibold text-slate-800">{livro.categoria}</span>
                <span aria-hidden="true">·</span>
                <span>Ano {livro.ano_lancamento}</span>
                {livro.colecao && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="italic">{livro.colecao}</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-slate-900 leading-snug mb-2">
                {livro.titulo}
              </h2>

              {/* Author & Publisher */}
              <div className="text-sm text-slate-700 mb-6 space-y-1">
                <p>
                  <span className="text-slate-400">Autoria:</span>{' '}
                  <strong className="text-slate-900 font-semibold">{livro.autor}</strong>
                </p>
                <p>
                  <span className="text-slate-400">Editora:</span>{' '}
                  <strong className="text-slate-900 font-semibold">{livro.editora}</strong>
                </p>
              </div>

              {/* Real-time Status Card (NO QUANTITY EXPOSED) */}
              <div
                className={`p-4 rounded-xl border mb-6 ${
                  isDisponivel
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isDisponivel ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="text-sm font-bold">
                      {isDisponivel
                        ? 'Disponível para Empréstimo Presencial'
                        : 'Indisponível no Momento (Todos os exemplares emprestados)'}
                    </h4>
                    <p className="text-xs mt-1 leading-relaxed opacity-90">
                      {isDisponivel
                        ? 'Este livro físico está na estante da biblioteca pronto para ser retirado. Visite nosso balcão de atendimento presencial!'
                        : 'Todos os exemplares físicos deste livro estão atualmente com leitores cadastrados. Por favor, volte a consultar o site em alguns dias.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Synopsis */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Sinopse da Obra
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-h-48 overflow-y-auto pr-2">
                  {livro.sinopse}
                </p>
              </div>
            </div>

            {/* Community Physical Loan Rules Notice */}
            <div className="pt-4 border-t border-slate-200">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs text-slate-700 space-y-2">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                  <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  Como retirar na Biblioteca Comunitária:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Prazo de devolução: {config.prazo_dias} dias</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Até {config.max_livros_mes} livros por mês</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Ajuda solidária: R$ {config.valor_ajuda_mensal.toFixed(2).replace('.', ',')}/mês</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{config.endereco}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Fechar Visualização
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
