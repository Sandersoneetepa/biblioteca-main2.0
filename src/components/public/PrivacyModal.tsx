import React from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { ConfiguracaoBiblioteca } from '../../types';

interface PrivacyModalProps {
  config: ConfiguracaoBiblioteca;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ config, onClose }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar Política de Privacidade"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Política de Privacidade & Conformidade LGPD
            </h2>
            <p className="text-xs text-slate-500">
              {config.nome_biblioteca} — Lei Geral de Proteção de Dados (Lei nº 13.709/2018)
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5 text-xs sm:text-sm text-slate-600 max-h-[60vh] overflow-y-auto pr-2 leading-relaxed">
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Privacidade Absoluta na Vitrine Pública:</strong> Esta vitrine online de consulta de acervo NÃO exibe, em hipótese alguma, nomes, dados cadastrais, telefones ou histórico de leitura dos usuários. O visitante consulta apenas se os livros físicos estão disponíveis ou emprestados.
            </span>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              1. Coleta de Dados Presencial
            </h3>
            <p>
              Os dados dos leitores (como nome completo, idade, escolaridade, endereço, telefone celular, e-mail e instituição de ensino) são coletados <strong>exclusivamente de forma presencial</strong> no balcão de atendimento da biblioteca comunitária, mediante consentimento livre, expresso e inequívoco do titular ou de seu responsável legal (no caso de menores de idade).
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-1.5">
              <Lock className="w-4 h-4 text-blue-600" />
              2. Finalidade Específica do Tratamento
            </h3>
            <p>
              As informações cadastrais têm como única finalidade operacional:
            </p>
            <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-600 text-xs pl-2">
              <li>Identificação do leitor e emissão da ficha física/digital de empréstimo;</li>
              <li>Controle de prazos de devolução (15 dias) e envio de avisos de vencimento ou renovação;</li>
              <li>Registro da contribuição solidária voluntária de R$ {config.valor_ajuda_mensal.toFixed(2).replace('.', ',')}/mês destinada à conservação do acervo;</li>
              <li>Comprovação de vínculo estudantil para prioridade em obras didáticas.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              3. Armazenamento Seguro e Não Compartilhamento
            </h3>
            <p>
              A Biblioteca Comunitária <strong>jamais comercializa, aluga ou compartilha</strong> dados pessoais de leitores com terceiros, empresas de marketing ou anunciantes. O acesso ao banco de dados administrativo é restrito aos funcionários e gerentes autorizados por meio de credenciais com criptografia e perfis hierárquicos de acesso.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              4. Direitos do Titular (Artigo 18 da LGPD)
            </h3>
            <p>
              A qualquer momento, o titular dos dados cadastrados pode solicitar presencialmente ou pelo e-mail <strong>{config.email}</strong> a confirmação de tratamento, acesso aos seus dados, correção de informações incompletas ou a revogação do consentimento com a exclusão definitiva do cadastro, desde que não existam livros físicos pendentes de devolução.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
            Encarregado pelo Tratamento de Dados (DPO): Gestão Comunitária · Contato: {config.email}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
          >
            Entendi e Concordo
          </button>
        </div>
      </div>
    </div>
  );
};
