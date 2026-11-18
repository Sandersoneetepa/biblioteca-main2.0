import React, { useState } from 'react';
import { db } from '../../services/db';
import { Lock, Mail, ArrowLeft, ShieldAlert, KeyRound, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Funcionario } from '../../types';

interface AdminLoginProps {
  onLoginSuccess: (user: Funcionario) => void;
  onBackToPublic: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToPublic }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Brute-force protection: check if locked
    if (lockedUntil && Date.now() < lockedUntil) {
      const waitSeconds = Math.ceil((lockedUntil - Date.now()) / 1000);
      setErrorMsg(`Acesso bloqueado temporariamente por tentativas excessivas. Aguarde ${waitSeconds} segundos.`);
      return;
    }

    if (!email.trim() || !senha.trim()) {
      setErrorMsg('Por favor, preencha o e-mail e a senha.');
      return;
    }

    setLoading(true);

    // Simulate small auth delay
    setTimeout(() => {
      const result = db.autenticar(email, senha);
      setLoading(false);

      if (result.success && result.funcionario) {
        setAttempts(0);
        onLoginSuccess(result.funcionario);
      } else {
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);

        if (nextAttempts >= 4) {
          const lockTime = Date.now() + 30000; // 30s lockout
          setLockedUntil(lockTime);
          setErrorMsg('Muitas tentativas incorretas. Bloqueio de segurança ativado por 30 segundos.');
        } else {
          setErrorMsg(result.message || 'Credenciais inválidas.');
        }
      }
    }, 300);
  };

  // Quick switch for testing access levels
  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setSenha(demoPass);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Top Back Button */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4">
        <button
          onClick={onBackToPublic}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a Vitrine Pública de Consulta
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white mx-auto flex items-center justify-center shadow-md mb-3">
            <Lock className="w-6 h-6 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Painel Administrativo da Biblioteca
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Área de acesso restrito a funcionários, gerentes e administradores.
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-slate-200 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                E-mail Institucional
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@biblioteca.org"
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Senha de Acesso
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? 'Validando credenciais...' : 'Entrar no Sistema'}
            </button>
          </form>

          {/* Demo Credentials Quick Switcher */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
              Contas de Teste Pré-Configuradas:
            </div>
            <p className="text-[11px] text-slate-500 mb-3">
              Clique para preencher automaticamente e testar os três níveis de acesso exigidos:
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@biblioteca.org', 'admin123')}
                className="w-full text-left p-2.5 rounded-lg border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100/80 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    Super Admin (Criador)
                  </div>
                  <div className="text-[11px] text-indigo-700">admin@biblioteca.org · admin123</div>
                </div>
                <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-200/80 px-2 py-0.5 rounded">
                  Acesso Total
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('gerente@biblioteca.org', 'gerente123')}
                className="w-full text-left p-2.5 rounded-lg border border-blue-200 bg-blue-50/70 hover:bg-blue-100/80 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    Gerente
                  </div>
                  <div className="text-[11px] text-blue-700">gerente@biblioteca.org · gerente123</div>
                </div>
                <span className="text-[10px] font-semibold text-blue-700 bg-blue-200/80 px-2 py-0.5 rounded">
                  Acervo, Leitores & Equipe
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('funcionario@biblioteca.org', 'funcionario123')}
                className="w-full text-left p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/80 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    Funcionário
                  </div>
                  <div className="text-[11px] text-emerald-700">funcionario@biblioteca.org · funcionario123</div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-200/80 px-2 py-0.5 rounded">
                  Empréstimos & Livros
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Sessão protegida contra ataques de força bruta</span>
        </div>
      </div>
    </div>
  );
};
