import React, { useState, useMemo } from 'react';
import { Livro } from '../../types';
import { BookCard } from './BookCard';
import { BookOpen, GraduationCap, Library, Filter } from 'lucide-react';

interface GondolasSectionProps {
  livros: Livro[];
  searchTerm: string;
  gondolaFilter: 'todas' | 'Ler' | 'Estudar';
  disponibilidadeFilter: 'todos' | 'disponiveis' | 'indisponiveis';
  onOpenDetails: (livro: Livro) => void;
}

export const GondolasSection: React.FC<GondolasSectionProps> = ({
  livros,
  searchTerm,
  gondolaFilter,
  disponibilidadeFilter,
  onOpenDetails,
}) => {
  const [selectedCategoria, setSelectedCategoria] = useState<string>('todas');

  // Extract all categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    livros.forEach((l) => set.add(l.categoria));
    return Array.from(set).sort();
  }, [livros]);

  // Filter books
  const filteredLivros = useMemo(() => {
    return livros.filter((livro) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = livro.titulo.toLowerCase().includes(query);
        const matchesAutor = livro.autor.toLowerCase().includes(query);
        const matchesEditora = livro.editora.toLowerCase().includes(query);
        const matchesCategoria = livro.categoria.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAutor && !matchesEditora && !matchesCategoria) {
          return false;
        }
      }

      // Gondola
      if (gondolaFilter !== 'todas' && livro.gondola !== gondolaFilter) {
        return false;
      }

      // Categoria
      if (selectedCategoria !== 'todas' && livro.categoria !== selectedCategoria) {
        return false;
      }

      // Disponibilidade
      if (disponibilidadeFilter === 'disponiveis' && livro.quantidade_disponivel <= 0) {
        return false;
      }
      if (disponibilidadeFilter === 'indisponiveis' && livro.quantidade_disponivel > 0) {
        return false;
      }

      return true;
    });
  }, [livros, searchTerm, gondolaFilter, selectedCategoria, disponibilidadeFilter]);

  const livrosLer = filteredLivros.filter((l) => l.gondola === 'Ler');
  const livrosEstudar = filteredLivros.filter((l) => l.gondola === 'Estudar');

  return (
    <section id="gondolas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Library className="w-4 h-4" />
            <span>Estante Virtual da Comunidade</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Gôndolas de Consulta do Acervo
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Navegue pelos livros organizados nas estantes temáticas. Confira a capa, o autor e a disponibilidade física na biblioteca antes de comparecer para retirar.
          </p>
        </div>

        {/* Category Pill/Dropdown Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <label htmlFor="cat-filter" className="text-xs font-medium text-slate-600">
            Filtrar por Categoria:
          </label>
          <select
            id="cat-filter"
            value={selectedCategoria}
            onChange={(e) => setSelectedCategoria(e.target.value)}
            className="text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="todas">Todas as Categorias ({livros.length})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* When filtering by specific gondola or search */}
      {filteredLivros.length === 0 ? (
        <div className="my-16 text-center py-12 px-4 bg-white rounded-2xl border border-dashed border-slate-300">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800">
            Nenhum livro encontrado com esses filtros
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Tente buscar com outros termos ou redefinir os filtros de Gôndola e Disponibilidade.
          </p>
        </div>
      ) : gondolaFilter !== 'todas' ? (
        /* Unified view for single gondola */
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-6">
            {gondolaFilter === 'Ler' ? (
              <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
                <BookOpen className="w-5 h-5" />
              </div>
            ) : (
              <div className="p-2 rounded-lg bg-blue-100 text-blue-800">
                <GraduationCap className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Gôndola &quot;{gondolaFilter}&quot;
              </h3>
              <p className="text-xs text-slate-500">
                {gondolaFilter === 'Ler'
                  ? 'Literatura brasileira, clássicos, romances, teatro e poesia'
                  : 'Obras de estudo, ciências, história, apoio escolar e vestibulares'}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredLivros.map((livro) => (
              <BookCard key={livro.id} livro={livro} onOpenDetails={onOpenDetails} />
            ))}
          </div>
        </div>
      ) : (
        /* Both Gondolas presented side-by-side or stacked as authentic shelves */
        <div className="space-y-16 mt-10">
          {/* GÔNDOLA 1: LER */}
          {livrosLer.length > 0 && (
            <div>
              <div className="flex items-center justify-between pb-3 mb-6 border-b border-amber-200/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                      Gôndola &quot;Ler&quot;
                      <span className="text-xs font-normal text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                        Ficção & Literatura
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Romances, contos, crônicas e poesia para enriquecer o prazer da leitura.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500 tabular-nums">
                  {livrosLer.length} títulos
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {livrosLer.map((livro) => (
                  <BookCard key={livro.id} livro={livro} onOpenDetails={onOpenDetails} />
                ))}
              </div>
            </div>
          )}

          {/* GÔNDOLA 2: ESTUDAR */}
          {livrosEstudar.length > 0 && (
            <div>
              <div className="flex items-center justify-between pb-3 mb-6 border-b border-blue-200/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                      Gôndola &quot;Estudar&quot;
                      <span className="text-xs font-normal text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
                        Didáticos & Ciências
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Apoio a estudantes do ensino fundamental, médio, técnico e vestibulandos.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500 tabular-nums">
                  {livrosEstudar.length} títulos
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {livrosEstudar.map((livro) => (
                  <BookCard key={livro.id} livro={livro} onOpenDetails={onOpenDetails} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
