import React, { useState } from 'react';
import { ConfiguracaoBiblioteca } from '../../types';
import {
  Settings,
  KeyRound,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Coins,
  ShieldCheck,
  Download,
  Upload,
  RefreshCcw,
  AlertTriangle,
} from 'lucide-react';
import { db } from '../../services/db';

interface AdminSettingsProps {
  config: ConfiguracaoBiblioteca;
  onUpdateConfig: (config: Partial<ConfiguracaoBiblioteca>) => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ config, onUpdateConfig }) => {
  const [nome, setNome] = useState(config.nome_biblioteca);
  const [slogan, setSlogan] = useState(config.slogan);
  const [endereco, setEndereco] = useState(config.endereco);
  const [bairro, setBairro] = useState(config.bairro);
  const [cidadeUf, setCidadeUf] = useState(config.cidade_uf);
  const [cep, setCep] = useState(config.cep);
  const [email, setEmail] = useState(config.email);
  const [telefone, setTelefone] = useState(config.telefone);
  const [whatsapp, setWhatsapp] = useState(config.whatsapp);
  const [horario, setHorario] = useState(config.horario_funcionamento);

  const [valorAjuda, setValorAjuda] = useState(config.valor_ajuda_mensal);
  const [maxLivros, setMaxLivros] = useState(config.max_livros_mes);
  const [prazoDias, setPrazoDias] = useState(config.prazo_dias);

  const [licencaChave, setLicencaChave] = useState(config.licenca_chave);
  const [licencaAtiva, setLicencaAtiva] = useState(config.licenca_ativa);

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({
      nome_biblioteca: nome.trim(),
      slogan: slogan.trim(),
      endereco: endereco.trim(),
      bairro: bairro.trim(),
      cidade_uf: cidadeUf.trim(),
      cep: cep.trim(),
      email: email.trim(),
      telefone: telefone.trim(),
      whatsapp: whatsapp.trim(),
      horario_funcionamento: horario.trim(),
      valor_ajuda_mensal: Number(valorAjuda) || 3.0,
      max_livros_mes: Number(maxLivros) || 3,
      prazo_dias: Number(prazoDias) || 15,
      licenca_chave: licencaChave.trim(),
      licenca_ativa: licencaAtiva,
    });
    setFeedback({ type: 'success', text: 'Configurações da biblioteca atualizadas com sucesso!' });
  };

  const handleExportBackup = () => {
    const data = db.exportDataJson();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biblioteca_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setFeedback({ type: 'success', text: 'Backup do banco exportado com sucesso em arquivo JSON!' });
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const res = db.importDataJson(content);
          if (res.success) {
            setFeedback({ type: 'success', text: 'Dados restaurados com sucesso!' });
          } else {
            setFeedback({ type: 'error', text: res.message || 'Erro ao importar backup.' });
          }
        } catch {
          setFeedback({ type: 'error', text: 'Arquivo inválido.' });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleResetData = () => {
    if (confirm('Tem certeza de que deseja restaurar os dados de demonstração iniciais? Isso recarregará o acervo e usuários padrão.')) {
      db.resetToDefault();
      setFeedback({ type: 'success', text: 'Dados de demonstração restaurados com sucesso!' });
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Heading */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Configurações da Biblioteca & Licenciamento
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Acesso exclusivo do Super Administrador (Criador). Edite os dados cadastrais da instituição, regras e chaves de licença.
        </p>
      </div>

      {feedback && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-xs font-bold hover:underline cursor-pointer">
            Fechar
          </button>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveGeneral} className="space-y-6">
        {/* Card 1: Identificação da Biblioteca */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <Building2 className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Dados Cadastrais da Biblioteca Comunitária
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nome Oficial da Biblioteca
              </label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Slogan / Mensagem da Comunidade
              </label>
              <input
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Endereço Físico Completo (Para Retirada Presencial)
              </label>
              <input
                type="text"
                required
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bairro
              </label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Cidade - UF
              </label>
              <input
                type="text"
                value={cidadeUf}
                onChange={(e) => setCidadeUf(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                E-mail de Contato
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Telefone Principal
              </label>
              <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp Oficial
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Horário de Atendimento Presencial
              </label>
              <input
                type="text"
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Regras Comunitárias de Empréstimo */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <Coins className="w-5 h-5 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Regras e Parâmetros Operacionais de Empréstimo
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Prazo Padrão de Devolução (Dias)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={prazoDias}
                onChange={(e) => setPrazoDias(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 tabular-nums"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Regulamentar: 15 dias</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Limite de Livros por Leitor
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={maxLivros}
                onChange={(e) => setMaxLivros(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 tabular-nums"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Regulamentar: 3 livros</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ajuda Solidária Mensal (R$)
              </label>
              <input
                type="number"
                step="0.50"
                min="0"
                value={valorAjuda}
                onChange={(e) => setValorAjuda(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 tabular-nums"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Regulamentar: R$ 3,00</span>
            </div>
          </div>
        </div>

        {/* Card 3: Ativação de Licença do Software */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-purple-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Ativação & Licenciamento do Sistema
              </h3>
            </div>
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                licencaAtiva
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  : 'bg-rose-100 text-rose-800 border-rose-200'
              }`}
            >
              {licencaAtiva ? '✓ Licença Ativa & Válida' : '✗ Licença Suspensa'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Chave da Licença (Serial Key)
              </label>
              <input
                type="text"
                value={licencaChave}
                onChange={(e) => setLicencaChave(e.target.value)}
                placeholder="BIBLIO-COM-XXXX-XXXX"
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={licencaAtiva}
                  onChange={(e) => setLicencaAtiva(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <span className="text-xs font-bold text-slate-800">
                  Sistema com Licença Habilitada
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Salvar Todas as Configurações
          </button>
        </div>
      </form>

      {/* Database Maintenance Tools */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
          <ShieldCheck className="w-5 h-5 text-slate-700" />
          <h3 className="text-sm font-bold text-slate-900">
            Ferramentas de Banco de Dados & Backup
          </h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Exporte uma cópia completa de todos os livros físicos, empréstimos, leitores cadastrados e termos de consentimento LGPD para salvaguarda institucional.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportBackup}
            className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download className="w-4 h-4 text-blue-600" />
            Baixar Backup Completo (JSON)
          </button>

          <label className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs">
            <Upload className="w-4 h-4 text-emerald-600" />
            Restaurar Backup de Arquivo
            <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
          </label>

          <button
            onClick={handleResetData}
            className="px-4 py-2 text-xs font-semibold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer ml-auto"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            Resetar para Acervo de Demonstração
          </button>
        </div>
      </div>
    </div>
  );
};
