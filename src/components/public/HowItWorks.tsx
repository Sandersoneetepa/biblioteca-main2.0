import React from 'react';
import { Search, MapPin, UserCheck, BookOpenCheck, Clock, Phone, Mail, MessageSquare } from 'lucide-react';
import { ConfiguracaoBiblioteca } from '../../types';

interface HowItWorksProps {
  config: ConfiguracaoBiblioteca;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ config }) => {
  return (
    <section id="como-funciona" className="bg-slate-100/70 border-t border-b border-slate-200 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Regras de Convivência & Funcionamento
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 tracking-tight">
            Como Funciona o Empréstimo Presencial
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Nossa biblioteca é um espaço comunitário aberto a todos os moradores e estudantes. Conheça as quatro etapas simples para levar cultura e saber para a sua casa.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-4 border border-blue-100">
                <Search className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Etapa 1
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">
                Consulte a Vitrine
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Navegue pelo site e verifique se o livro desejado está com o <strong>Check Verde</strong> (Disponível). Assim você economiza tempo e não dá viagem perdida.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              Sem necessidade de login ou senha
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-4 border border-blue-100">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Etapa 2
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">
                Venha até a Biblioteca
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compareça à nossa sede física durante o horário de atendimento. Nossos voluntários e funcionários terão prazer em recebê-lo e indicar a estante do livro.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              {config.bairro}, {config.cidade_uf}
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-4 border border-blue-100">
                <UserCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Etapa 3
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">
                Cadastro Presencial
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Apresente documento e comprovante no balcão. O cadastro é protegido pela <strong>LGPD</strong> com consentimento expresso e contribuição solidária de <strong>R$ {config.valor_ajuda_mensal.toFixed(2).replace('.', ',')}/mês</strong>.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              Feito na hora em 3 minutos
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg mb-4 border border-blue-100">
                <BookOpenCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Etapa 4
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">
                Retire até 3 Livros
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Leve até <strong>{config.max_livros_mes} livros físicos</strong> pelo prazo de <strong>{config.prazo_dias} dias</strong>. Caso precise de mais tempo, a renovação pode ser solicitada presencialmente ou por contato.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
              Renovação por mais {config.prazo_dias} dias
            </div>
          </div>
        </div>

        {/* Location & Contact Card */}
        <div id="localizacao" className="mt-14 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Local de Retirada & Contato
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 mb-4">
                Nosso Endereço Físico
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Venha nos visitar para estudar em nosso salão de leitura silencioso, retirar seus livros ou participar dos clubes de leitura comunitários.
              </p>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{config.endereco}</div>
                    <div className="text-xs text-slate-500">{config.bairro} — {config.cidade_uf} — CEP: {config.cep}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Horário de Atendimento</div>
                    <div className="text-xs text-slate-500">{config.horario_funcionamento}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-700 font-medium">{config.telefone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs text-slate-700 font-medium">WhatsApp: {config.whatsapp}</span>
                  </div>
                  <div className="flex items-center gap-2.5 sm:col-span-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-xs text-slate-700 font-medium">{config.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900 p-8 text-white flex flex-col justify-between">
              <div>
                <div className="inline-block text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">
                  Espaço da Comunidade
                </div>
                <h4 className="text-xl font-bold mb-3">
                  Apoie a Biblioteca Comunitária
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Nossos livros são mantidos por doações da comunidade e pela ajuda simbólica de R$ {config.valor_ajuda_mensal.toFixed(2).replace('.', ',')}/mês dos leitores. Se você possui livros em bom estado para doar, traga até nossa recepção!
                </p>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 text-xs text-slate-300 space-y-2">
                  <div className="font-semibold text-amber-300">
                    Aceitamos doações de:
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                    <li>Literatura brasileira e estrangeira em bom estado</li>
                    <li>Livros didáticos recentes (ensino médio e fundamental)</li>
                    <li>Obras de divulgação científica, filosofia e história</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                Atendimento presencial solidário e sem fins lucrativos.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
