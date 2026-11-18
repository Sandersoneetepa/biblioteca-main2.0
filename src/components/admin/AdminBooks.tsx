import React, { useState, useMemo } from 'react';
import { Livro, Gondola } from '../../types';
import {
  Plus,
  Search,
  BookOpen,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Image as ImageIcon,
  X,
  Upload,
} from 'lucide-react';

interface AdminBooksProps {
  livros: Livro[];
  onSaveBook: (book: Omit<Livro, 'id'> & { id?: string }) => void;
  onDeleteBook: (id: string) => { success: boolean; message?: string };
}

// Preset local images generated for quick 1-click selection
const PRESET_COVERS = [
  { label: 'Capa Literatura (O Mar de Ondas)', url: '/src/assets/images/book_cover_literatura_1793967523519.jpg' },
  { label: 'Capa Ciências (Cosmos & Chaos)', url: '/src/assets/images/book_cover_ciencias_1793967522193.jpg' },
  { label: 'Capa História (Arquiteturas)', url: '/src/assets/images/book_cover_historia_1793967523098.jpg' },
];

export const AdminBooks: React.FC<AdminBooksProps> = ({ livros, onSaveBook, onDeleteBook }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGondola, setSelectedGondola] = useState<string>('todas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Livro | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState('');
  const [ano, setAno] = useState(2024);
  const [categoria, setCategoria] = useState('Literatura Brasileira');
  const [gondola, setGondola] = useState<Gondola>('Ler');
  const [colecao, setColecao] = useState('');
  const [capaUrl, setCapaUrl] = useState('');
  const [sinopse, setSinopse] = useState('');
  const [quantidadeTotal, setQuantidadeTotal] = useState(3);
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState(3);

  const filteredLivros = useMemo(() => {
    return livros.filter((l) => {
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matches =
          l.titulo.toLowerCase().includes(q) ||
          l.autor.toLowerCase().includes(q) ||
          l.editora.toLowerCase().includes(q) ||
          l.categoria.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedGondola !== 'todas' && l.gondola !== selectedGondola) return false;
      return true;
    });
  }, [livros, searchTerm, selectedGondola]);

  const handleOpenCreate = () => {
    setEditingBook(null);
    setTitulo('');
    setAutor('');
    setEditora('');
    setAno(new Date().getFullYear());
    setCategoria('Literatura Brasileira');
    setGondola('Ler');
    setColecao('');
    setCapaUrl(PRESET_COVERS[0].url);
    setSinopse('');
    setQuantidadeTotal(3);
    setQuantidadeDisponivel(3);
    setIsModalOpen(true);
    setFeedbackMsg(null);
  };

  const handleOpenEdit = (livro: Livro) => {
    setEditingBook(livro);
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setEditora(livro.editora);
    setAno(livro.ano_lancamento);
    setCategoria(livro.categoria);
    setGondola(livro.gondola);
    setColecao(livro.colecao || '');
    setCapaUrl(livro.capa_url);
    setSinopse(livro.sinopse);
    setQuantidadeTotal(livro.quantidade_total);
    setQuantidadeDisponivel(livro.quantidade_disponivel);
    setIsModalOpen(true);
    setFeedbackMsg(null);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !autor.trim() || !editora.trim()) {
      setFeedbackMsg({ type: 'error', text: 'Preencha título, autor e editora.' });
      return;
    }

    if (quantidadeDisponivel > quantidadeTotal) {
      setFeedbackMsg({
        type: 'error',
        text: 'A quantidade disponível não pode ser maior que a quantidade total de exemplares.',
      });
      return;
    }

    onSaveBook({
      id: editingBook ? editingBook.id : undefined,
      titulo: titulo.trim(),
      autor: autor.trim(),
      editora: editora.trim(),
      ano_lancamento: Number(ano) || 2024,
      categoria: categoria.trim(),
      gondola,
      colecao: colecao.trim() || undefined,
      capa_url: capaUrl.trim() || PRESET_COVERS[0].url,
      sinopse: sinopse.trim() || 'Sem sinopse cadastrada.',
      quantidade_total: Math.max(1, Number(quantidadeTotal) || 1),
      quantidade_disponivel: Math.max(0, Number(quantidadeDisponivel) || 0),
    });

    setIsModalOpen(false);
    setFeedbackMsg({
      type: 'success',
      text: editingBook ? 'Livro atualizado com sucesso no acervo!' : 'Novo livro adicionado ao acervo com sucesso!',
    });
  };

  const handleDelete = (id: string) => {
    const res = onDeleteBook(id);
    if (res.success) {
      setDeleteConfirmId(null);
      setFeedbackMsg({ type: 'success', text: 'Livro excluído com sucesso do acervo.' });
    } else {
      setFeedbackMsg({ type: 'error', text: res.message || 'Erro ao excluir livro.' });
    }
  };

  // Simulated image upload via file reader or custom URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapaUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Gestão do Acervo de Livros Físicos
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Aqui você gerencia o estoque real de cada título: quantidade total e exemplares disponíveis na estante.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Adicionar Novo Livro
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
          <button
            onClick={() => setFeedbackMsg(null)}
            className="text-xs font-bold hover:underline cursor-pointer"
          >
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
            placeholder="Filtrar por título, autor, editora..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-slate-500 font-medium">Gôndola:</label>
          <select
            value={selectedGondola}
            onChange={(e) => setSelectedGondola(e.target.value)}
            className="text-xs font-medium border border-slate-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="todas">Todas as Gôndolas ({livros.length})</option>
            <option value="Ler">Gôndola Ler (Literatura)</option>
            <option value="Estudar">Gôndola Estudar (Didáticos & Ciências)</option>
          </select>
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Capa & Livro</th>
                <th className="py-3 px-4">Gôndola & Categoria</th>
                <th className="py-3 px-4">Autor & Editora</th>
                <th className="py-3 px-4 text-center">Exemplares Físicos (Total)</th>
                <th className="py-3 px-4 text-center">Disponíveis na Estante</th>
                <th className="py-3 px-4 text-center">Status Vitrine</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLivros.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Nenhum livro cadastrado ou correspondente ao filtro.
                  </td>
                </tr>
              ) : (
                filteredLivros.map((livro) => {
                  const isDisponivel = livro.quantidade_disponivel > 0;
                  return (
                    <tr key={livro.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Capa & Title */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-14 bg-slate-100 rounded border border-slate-200 overflow-hidden shrink-0 shadow-2xs">
                            {livro.capa_url ? (
                              <img
                                src={livro.capa_url}
                                alt={livro.titulo}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white">
                                <BookOpen className="w-4 h-4 text-blue-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                              {livro.titulo}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              Lançamento: {livro.ano_lancamento}
                              {livro.colecao && ` · ${livro.colecao}`}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Gôndola & Categoria */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            livro.gondola === 'Ler'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {livro.gondola === 'Ler' ? '📖 Ler' : '🎓 Estudar'}
                        </span>
                        <div className="text-slate-600 mt-1 font-medium">{livro.categoria}</div>
                      </td>

                      {/* Autor & Editora */}
                      <td className="py-3 px-4 text-slate-700">
                        <div className="font-semibold text-slate-900">{livro.autor}</div>
                        <div className="text-slate-500 text-[11px]">{livro.editora}</div>
                      </td>

                      {/* Quantidade Total */}
                      <td className="py-3 px-4 text-center font-bold text-slate-900 tabular-nums">
                        {livro.quantidade_total} cópias
                      </td>

                      {/* Quantidade Disponível (Regra de Negócio Crítica) */}
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-md font-bold tabular-nums text-xs ${
                            livro.quantidade_disponivel > 0
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {livro.quantidade_disponivel} disponíveis
                        </span>
                      </td>

                      {/* Status Vitrine Pública */}
                      <td className="py-3 px-4 text-center">
                        {isDisponivel ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Check Verde
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            <XCircle className="w-3.5 h-3.5 text-rose-600" />
                            Check Vermelho
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEdit(livro)}
                          className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                          title="Editar livro e quantidades"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(livro.id)}
                          className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                          title="Excluir livro do acervo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-2">Confirmar Exclusão</h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Tem certeza de que deseja remover este livro do acervo físico? Se houver exemplares atualmente emprestados, a exclusão será impedida para preservar o histórico.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg cursor-pointer"
              >
                Excluir Livro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Book Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editingBook ? 'Editar Livro do Acervo' : 'Cadastrar Novo Livro no Acervo Físico'}
                </h3>
                <p className="text-xs text-slate-500">
                  Preencha os dados bibliográficos e a quantidade física de exemplares.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Título da Obra *
                  </label>
                  <input
                    type="text"
                    required
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ex: O Mar de Ondas Velhas"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nome do Autor *
                  </label>
                  <input
                    type="text"
                    required
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    placeholder="Ex: Álvaro Almeida Reis"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Editora *
                  </label>
                  <input
                    type="text"
                    required
                    value={editora}
                    onChange={(e) => setEditora(e.target.value)}
                    placeholder="Ex: Editora São Francisco"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ano de Lançamento
                  </label>
                  <input
                    type="number"
                    value={ano}
                    onChange={(e) => setAno(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Coleção / Série (Opcional)
                  </label>
                  <input
                    type="text"
                    value={colecao}
                    onChange={(e) => setColecao(e.target.value)}
                    placeholder="Ex: Clássicos Brasileiros"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gôndola Temática *
                  </label>
                  <select
                    value={gondola}
                    onChange={(e) => setGondola(e.target.value as Gondola)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="Ler">Gôndola &quot;Ler&quot; (Ficção, Romance, Poesia, Contos)</option>
                    <option value="Estudar">Gôndola &quot;Estudar&quot; (Ciências, História, Didáticos)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Categoria Específica
                  </label>
                  <input
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    placeholder="Ex: Literatura Brasileira, Astronomia..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Quantities (Visible and editable in admin!) */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Quantidade Total de Exemplares *
                  </label>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Total de cópias físicas pertencentes à biblioteca.
                  </p>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantidadeTotal}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setQuantidadeTotal(val);
                      if (!editingBook) setQuantidadeDisponivel(val);
                    }}
                    className="w-full px-3 py-2 text-xs font-bold text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <label className="block text-xs font-bold text-slate-900 mb-1">
                    Exemplares Disponíveis na Estante *
                  </label>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Cópias prontas para retirada no momento.
                  </p>
                  <input
                    type="number"
                    min="0"
                    max={quantidadeTotal}
                    required
                    value={quantidadeDisponivel}
                    onChange={(e) => setQuantidadeDisponivel(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-bold text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                {/* Capa Upload / Selection */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Capa do Livro (URL ou Escolha Rápida)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={capaUrl}
                      onChange={(e) => setCapaUrl(e.target.value)}
                      placeholder="https://... ou caminho da imagem"
                      className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg cursor-pointer flex items-center gap-1 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      Upload
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>

                  {/* Preset Cores quick picks */}
                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    <span className="text-[10px] text-slate-400 shrink-0">Capas pré-geradas:</span>
                    {PRESET_COVERS.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setCapaUrl(preset.url)}
                        className={`text-[10px] px-2 py-1 rounded border transition-colors cursor-pointer shrink-0 ${
                          capaUrl === preset.url
                            ? 'bg-blue-600 text-white border-blue-700 font-semibold'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sinopse / Resumo da Obra
                  </label>
                  <textarea
                    rows={3}
                    value={sinopse}
                    onChange={(e) => setSinopse(e.target.value)}
                    placeholder="Breve introdução ou sinopse da obra que será exibida para os leitores na vitrine..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                  {editingBook ? 'Salvar Alterações' : 'Cadastrar Livro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
