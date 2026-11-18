import React, { useState } from 'react';
import { CheckCircle2, XCircle, BookOpen } from 'lucide-react';
import { Livro } from '../../types';

interface BookCardProps {
  livro: Livro;
  onOpenDetails: (livro: Livro) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ livro, onOpenDetails }) => {
  const [imageError, setImageError] = useState(false);
  const isDisponivel = livro.quantidade_disponivel > 0;

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col h-full">
      {/* Book Cover Container with 3:4 Aspect Ratio */}
      <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onOpenDetails(livro)}>
        {!imageError && livro.capa_url ? (
          <img
            src={livro.capa_url}
            alt={`Capa do livro ${livro.titulo}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          /* High quality fallback */
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 p-6 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{livro.gondola === 'Ler' ? '📖 Ler' : '🎓 Estudar'}</span>
              <span>{livro.ano_lancamento}</span>
            </div>
            <div>
              <BookOpen className="w-8 h-8 text-blue-400 mb-3 opacity-80" />
              <h3 className="font-serif-title font-bold text-lg leading-snug line-clamp-3">
                {livro.titulo}
              </h3>
              <p className="text-xs text-slate-300 mt-2 line-clamp-1">{livro.autor}</p>
            </div>
            <div className="text-[11px] text-slate-400 tracking-wider uppercase">
              {livro.editora}
            </div>
          </div>
        )}

        {/* Floating Status Indicator on the top corner */}
        <div className="absolute top-3 right-3 z-10">
          {isDisponivel ? (
            <div
              title="Disponível para empréstimo presencial na biblioteca"
              className="flex items-center gap-1.5 bg-emerald-600/95 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-md backdrop-blur-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-200" />
              <span>Disponível</span>
            </div>
          ) : (
            <div
              title="Todos os exemplares estão emprestados no momento"
              className="flex items-center gap-1.5 bg-rose-600/95 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-md backdrop-blur-xs"
            >
              <XCircle className="w-3.5 h-3.5 text-rose-200" />
              <span>Indisponível</span>
            </div>
          )}
        </div>

        {/* Thematic Shelf Tag */}
        <div className="absolute bottom-2 left-2 z-10">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-xs">
            {livro.gondola === 'Ler' ? 'Gôndola Ler' : 'Gôndola Estudar'}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 truncate">
            <span className="font-medium text-slate-700 truncate">{livro.autor}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{livro.categoria}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums shrink-0">{livro.ano_lancamento}</span>
          </div>

          <h3
            onClick={() => onOpenDetails(livro)}
            className="font-bold text-slate-900 text-base leading-snug line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
          >
            {livro.titulo}
          </h3>

          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {livro.sinopse}
          </p>
        </div>

        {/* Footer with Status Notice and Mandatory Blue "Detalhes" Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="text-xs">
            {isDisponivel ? (
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Retirada no local
              </span>
            ) : (
              <span className="text-rose-600 font-medium flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                Exemplar emprestado
              </span>
            )}
          </div>

          <button
            onClick={() => onOpenDetails(livro)}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs whitespace-nowrap shrink-0 cursor-pointer"
          >
            Detalhes
          </button>
        </div>
      </div>
    </div>
  );
};
