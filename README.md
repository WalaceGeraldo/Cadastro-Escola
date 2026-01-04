# 🎓 Sistema de Gestão Escolar (Escola Premium)

Um sistema completo de gestão escolar desenvolvido para facilitar a administração de alunos, professores, turmas e financeiro.

![Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## 🚀 Tecnologias

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Server Components)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Banco de Dados**: SQLite (Dev) / PostgreSQL (Prod) com [Prisma ORM](https://www.prisma.io/)
- **Autenticação**: [NextAuth.js](https://next-auth.js.org/) (Credenciais)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)

## ✨ Funcionalidades

### 👑 Portal do Administrador/Dono
- **Dashboard**: Visão geral do sistema.
- **Gestão de Alunos**: Cadastro, edição e listagem.
- **Gestão de Professores**: Controle do corpo docente.
- **Gestão de Turmas**: Criação e organização de classes.
- **Gestão de Usuários**: Controle de acesso e permissões (RBAC).

### 👨‍🏫 Portal do Professor
- **Minhas Turmas**: Visualização das classes atribuídas.
- **Lançamento de Notas**: Sistema para inserir e gerenciar avaliações.

### 👨‍🎓 Portal do Aluno
- **Boletim Online**: Visualização de notas e desempenho por matéria.
- **Módulo Financeiro**:
    - Visualização de mensalidades e taxas.
    - Status de pagamento (Pago, Pendente, Vencido).
    - Código de barras para pagamento.

## 🛠️ Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seusrousuario/cadastro-escola.git
   cd cadastro-escola
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o Banco de Dados**
   ```bash
   # Gera o cliente Prisma e envia o schema para o banco (SQLite local)
   npx prisma generate
   npx prisma db push
   ```

4. **Popule o Banco de Dados (Seeds)**
   ```bash
   # Cria usuários iniciais e dados de teste
   node prisma/seed-owner.js
   node prisma/seed-teacher.js
   node prisma/seed-boletos.js
   ```

5. **Execute o Projeto**
   ```bash
   npm run dev
   ```
   Acesse: [http://localhost:3000](http://localhost:3000)

## 🔐 Acesso (Credenciais de Teste)

O sistema possui diferentes níveis de acesso. Após rodar os seeds, você pode usar:

| Perfil | Email | Senha |
|--------|-------|-------|
| **Dono/Admin** | `dono@escola.com` | `123456` |
| **Professor** | `professor@escola.com` | `123456` |
| **Aluno** | *(Verificar no banco ou criar via Admin)* | `123456` |

> **Nota**: O usuário Admin padrão criado manualmente pode ser `admin@admin.com` / `admin123` se o script `create-admin-user.js` for executado.

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para contribuir!
