# 📚 Biblioteca Comunitária Esperança & Saber

![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-success)
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-purple)
![LGPD](https://img.shields.io/badge/LGPD-Compliant-green)

Uma aplicação web (Vitrine Virtual e Painel Administrativo) desenvolvida para a gestão de uma biblioteca comunitária física. O sistema foi projetado para permitir que os leitores consultem a disponibilidade de livros antes de se deslocarem até a biblioteca, além de fornecer uma ferramenta robusta para os funcionários gerenciarem o acervo e os empréstimos.

## 🚀 Funcionalidades

### 👤 Área Pública (Vitrine do Leitor)
*   **Consulta de Acervo:** Busca por título, autor, editora ou assunto.
*   **Estante Virtual:** Livros separados por gôndolas temáticas ("Ler" e "Estudar").
*   **Status em Tempo Real:** Indicadores visuais de disponibilidade (🟢 Disponível / 🔴 Indisponível). *Nota: A quantidade de exemplares é oculta para o público geral.*
*   **Modal de Detalhes:** Visualização da capa, sinopse e informações do livro.
*   **Foco no Presencial:** O sistema não realiza empréstimos online; ele direciona o leitor para a retirada física.

### 🔐 Painel Administrativo (`/admin`)
*   **Níveis de Acesso:** Super Admin, Gerente e Funcionário.
*   **Gestão de Acervo:** Cadastro, edição e controle de quantidade de livros físicos.
*   **Gestão de Empréstimos:** Registro de saída, devolução e renovação (prazo padrão de 15 dias).
*   **Gestão de Leitores:** Cadastro completo com regras de negócio (limite de 3 livros/mês e controle da ajuda solidária de R$ 3,00).
*   **Conformidade com a LGPD:** Registro de consentimento (timestamp) no cadastro de leitores.

## 🛠️ Tecnologias Utilizadas
*   **Frontend:** React.js, Vite, TypeScript.
*   **Estilização:** Tailwind CSS (Design moderno, responsivo e acessível).
*   **Ícones:** Lucide React.
*   **Geração de Código:** Google AI Studio (Gemini).

## ⚙️ Como Executar o Projeto Localmente

1. Clone este repositório:
   ```bash
   git clone https://github.com/Sandersoneteepa/biblioteca-main2.0.git
