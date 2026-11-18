import React, { useState, useEffect } from 'react';
import { db } from './services/db';
import {
  Livro,
  Leitor,
  Funcionario,
  ConfiguracaoBiblioteca,
  EmprestimoComDetalhes,
} from './types';

// Public Components
import { PublicHeader } from './components/public/PublicHeader';
import { HeroSection } from './components/public/HeroSection';
import { GondolasSection } from './components/public/GondolasSection';
import { BookModal } from './components/public/BookModal';
import { HowItWorks } from './components/public/HowItWorks';
import { PrivacyModal } from './components/public/PrivacyModal';
import { PublicFooter } from './components/public/PublicFooter';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminHeader, AdminTab } from './components/admin/AdminHeader';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminBooks } from './components/admin/AdminBooks';
import { AdminLoans } from './components/admin/AdminLoans';
import { AdminReaders } from './components/admin/AdminReaders';
import { AdminUsers } from './components/admin/AdminUsers';
import { AdminSettings } from './components/admin/AdminSettings';

export default function App() {
  // Navigation / Routing State: '/' or '/admin'
  const [currentRoute, setCurrentRoute] = useState<'/' | '/admin'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#/admin' || hash === '#admin') {
        return '/admin';
      }
    }
    return '/';
  });

  // Database Reactive State
  const [config, setConfig] = useState<ConfiguracaoBiblioteca>(() => db.getConfiguracao());
  const [livros, setLivros] = useState<Livro[]>(() => db.getLivros());
  const [leitores, setLeitores] = useState<Leitor[]>(() => db.getLeitores());
  const [emprestimos, setEmprestimos] = useState<EmprestimoComDetalhes[]>(() => db.getEmprestimosComDetalhes());
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>(() => db.getFuncionarios());
  const [currentUser, setCurrentUser] = useState<Funcionario | null>(() => db.getSession());

  // Subscribe to DB updates
  useEffect(() => {
    const unsubscribe = db.subscribe(() => {
      setConfig(db.getConfiguracao());
      setLivros(db.getLivros());
      setLeitores(db.getLeitores());
      setEmprestimos(db.getEmprestimosComDetalhes());
      setFuncionarios(db.getFuncionarios());
      setCurrentUser(db.getSession());
    });
    return () => unsubscribe();
  }, []);

  // Listen to browser popstate for smooth back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#/admin' || hash === '#admin') {
        setCurrentRoute('/admin');
      } else {
        setCurrentRoute('/');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: '/' | '/admin') => {
    setCurrentRoute(route);
    if (typeof window !== 'undefined') {
      if (route === '/admin') {
        window.history.pushState({}, '', '/admin');
      } else {
        window.history.pushState({}, '', '/');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Public Showcase State
  const [searchTerm, setSearchTerm] = useState('');
  const [gondolaFilter, setGondolaFilter] = useState<'todas' | 'Ler' | 'Estudar'>('todas');
  const [disponibilidadeFilter, setDisponibilidadeFilter] = useState<'todos' | 'disponiveis' | 'indisponiveis'>('todos');
  const [selectedBookForModal, setSelectedBookForModal] = useState<Livro | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Admin Active Tab
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');

  const scrollToSection = (sectionId: string) => {
    if (currentRoute !== '/') {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Admin Handlers
  const handleSaveBook = (bookData: Omit<Livro, 'id'> & { id?: string }) => {
    db.saveLivro(bookData);
  };

  const handleDeleteBook = (id: string) => {
    return db.deleteLivro(id);
  };

  const handleSaveReader = (readerData: Omit<Leitor, 'id'> & { id?: string }) => {
    db.saveLeitor(readerData);
  };

  const handleDeleteReader = (id: string) => {
    return db.deleteLeitor(id);
  };

  const handleSaveUser = (userData: Omit<Funcionario, 'id'> & { id?: string }) => {
    db.saveFuncionario(userData);
  };

  const handleDeleteUser = (id: string) => {
    return db.deleteFuncionario(id);
  };

  const handleUpdateConfig = (configData: Partial<ConfiguracaoBiblioteca>) => {
    db.updateConfiguracao(configData);
  };

  const handleRegistrarEmprestimo = (params: {
    id_leitor: string;
    id_livro: string;
    data_inicio?: string;
    observacoes?: string;
  }) => {
    return db.registrarEmprestimo(params);
  };

  const handleDevolver = (idEmprestimo: string) => {
    return db.registrarDevolucao(idEmprestimo);
  };

  const handleRenovar = (idEmprestimo: string) => {
    return db.renovarEmprestimo(idEmprestimo);
  };

  const handleLogout = () => {
    db.logout();
    setCurrentUser(null);
  };

  // -------------------------------------------------------------
  // RENDER: ADMIN PANEL (/admin)
  // -------------------------------------------------------------
  if (currentRoute === '/admin') {
    if (!currentUser) {
      return (
        <AdminLogin
          onLoginSuccess={(user) => setCurrentUser(user)}
          onBackToPublic={() => navigateTo('/')}
        />
      );
    }

    return (
      <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
        <AdminHeader
          currentUser={currentUser}
          config={config}
          activeTab={adminTab}
          onSelectTab={setAdminTab}
          onLogout={handleLogout}
          onGoToPublic={() => navigateTo('/')}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
          {adminTab === 'dashboard' && (
            <AdminDashboard
              livros={livros}
              leitores={leitores}
              emprestimos={emprestimos}
              config={config}
              onSelectTab={setAdminTab}
              onOpenNewLoan={() => setAdminTab('emprestimos')}
              onOpenNewBook={() => setAdminTab('livros')}
              onOpenNewReader={() => setAdminTab('leitores')}
              onDevolver={handleDevolver}
              onRenovar={handleRenovar}
            />
          )}

          {adminTab === 'livros' && (
            <AdminBooks
              livros={livros}
              onSaveBook={handleSaveBook}
              onDeleteBook={handleDeleteBook}
            />
          )}

          {adminTab === 'emprestimos' && (
            <AdminLoans
              emprestimos={emprestimos}
              livros={livros}
              leitores={leitores}
              config={config}
              onRegistrarEmprestimo={handleRegistrarEmprestimo}
              onDevolver={handleDevolver}
              onRenovar={handleRenovar}
            />
          )}

          {adminTab === 'leitores' && (
            <AdminReaders
              leitores={leitores}
              emprestimos={emprestimos}
              config={config}
              onSaveReader={handleSaveReader}
              onDeleteReader={handleDeleteReader}
            />
          )}

          {adminTab === 'usuarios' && (currentUser.nivel_acesso === 'super_admin' || currentUser.nivel_acesso === 'gerente') && (
            <AdminUsers
              currentUser={currentUser}
              funcionarios={funcionarios}
              onSaveUser={handleSaveUser}
              onDeleteUser={handleDeleteUser}
            />
          )}

          {adminTab === 'configuracoes' && currentUser.nivel_acesso === 'super_admin' && (
            <AdminSettings
              config={config}
              onUpdateConfig={handleUpdateConfig}
            />
          )}
        </main>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: PUBLIC SHOWCASE (Vitrine do Leitor na Raiz /)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <PublicHeader
        config={config}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onGoToAdmin={() => navigateTo('/admin')}
        onScrollToSection={scrollToSection}
      />

      <main className="flex-1">
        <HeroSection
          config={config}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          gondolaFilter={gondolaFilter}
          onGondolaChange={setGondolaFilter}
          disponibilidadeFilter={disponibilidadeFilter}
          onDisponibilidadeChange={setDisponibilidadeFilter}
        />

        <GondolasSection
          livros={livros}
          searchTerm={searchTerm}
          gondolaFilter={gondolaFilter}
          disponibilidadeFilter={disponibilidadeFilter}
          onOpenDetails={(livro) => setSelectedBookForModal(livro)}
        />

        <HowItWorks config={config} />
      </main>

      <PublicFooter
        config={config}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onGoToAdmin={() => navigateTo('/admin')}
        onScrollToSection={scrollToSection}
      />

      {/* Book Details Modal */}
      <BookModal
        livro={selectedBookForModal}
        config={config}
        onClose={() => setSelectedBookForModal(null)}
      />

      {/* LGPD Privacy Policy Modal */}
      {isPrivacyModalOpen && (
        <PrivacyModal
          config={config}
          onClose={() => setIsPrivacyModalOpen(false)}
        />
      )}
    </div>
  );
}
