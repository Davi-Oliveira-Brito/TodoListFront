# TodoList Front

Front-end da aplicação de gerenciamento de tarefas (To Do List), construído em Next.js para consumir a [TodoListApi](https://github.com/Davi-Oliveira-Brito/TodoListApi) — API RESTful com autenticação JWT desenvolvida como desafio técnico para a vaga de Desenvolvedor C# na **PWI Sistemas**.

---

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Como Rodar](#como-rodar)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Autenticação](#autenticação)
- [Funcionalidades](#funcionalidades)
- [Rotas](#rotas)
- [Design System](#design-system)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Scripts Disponíveis](#scripts-disponíveis)

---

## Sobre o Projeto

Interface web para a TodoListApi: permite criar uma conta, autenticar e gerenciar tarefas pessoais — cada uma com um tipo associado (**Normal** ou **Urgente**), título, descrição e status de conclusão. Cada usuário só enxerga e manipula as próprias tarefas, seguindo o isolamento imposto pela API via JWT.

> ⚠️ Este projeto usa uma versão do Next.js com mudanças relevantes em relação às convenções tradicionais (ex.: middleware renomeado para `proxy.ts`/`proxy()`). Antes de alterar algo relacionado a roteamento/middleware, consulte a documentação em `node_modules/next/dist/docs/`.

---

## Tecnologias

- [Next.js 16](https://nextjs.org/) (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- [lucide-react](https://lucide.dev/) — ícones
- [sonner](https://sonner.emilkowal.ski/) — toasts
- JWT (decodificado no client para extrair dados do usuário e expiração)

---

## Arquitetura

O projeto segue uma separação por responsabilidade dentro de `src/`:

**`app/`** — rotas do App Router, organizadas em route groups:
- `(app)` — área autenticada (Navbar + página de tarefas)
- `(auth)` — telas de login/cadastro, com layout de card centralizado

**`components/`** — componentes React organizados por domínio:
- `ui/` — componentes genéricos e reutilizáveis (`Button`, `Input`, `Select`, `Modal`, `ConfirmModal`)
- `tarefas/` — componentes específicos do domínio de tarefas (`TarefaCard`, `TarefaList`, `TarefaForm`, `TarefaFormModal`, `TipoTarefaBadge`)
- `auth/` — formulários de login e cadastro
- `layout/` — `Navbar` e `Footer`

**`contexts/`** — `AuthContext`, expõe usuário autenticado e ações de login/registro/logout usando `useSyncExternalStore` para sincronizar o estado com o cookie de sessão.

**`hooks/`** — hooks que encapsulam chamadas aos services (`useAuth`, `useTarefas`, `useTipoTarefas`), lidando com loading e erros.

**`services/`** — camada de acesso à API (`api.ts` com o `apiFetch` genérico + `authService`, `tarefaService`, `tipoTarefaService`).

**`lib/`** — utilitários: `constants.ts` (URL da API, nome do cookie), `cookies.ts` (leitura/escrita de cookies no client), `jwt.ts` (decodifica o token e verifica expiração).

**`proxy.ts`** — equivalente ao middleware clássico do Next.js nesta versão: protege `/tarefas` para usuários não autenticados e redireciona usuários já autenticados para longe de `/login`, `/register` e `/`.

**`types/`** — tipos compartilhados (`auth.ts`, `tarefa.ts`).

Essa separação mantém componentes de UI livres de lógica de rede, hooks livres de JSX e a camada de serviços isolada de detalhes de autenticação client-side.

---

## Pré-requisitos

- [Node.js 20+](https://nodejs.org/)
- A [TodoListApi](https://github.com/Davi-Oliveira-Brito/TodoListApi) rodando localmente (ou acessível via URL configurada)

---

## Como Rodar

### 1. Clone o repositório

```bash
git clone https://github.com/Davi-Oliveira-Brito/TodoListFront.git
cd TodoListFront/todolist
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.local.example .env.local
```

Edite `.env.local` com a URL da API (veja [Variáveis de Ambiente](#variáveis-de-ambiente)).

### 4. Rode o projeto em modo desenvolvimento

```bash
npm run dev
```

### 5. Acesse no navegador

```
http://localhost:3000
```

Certifique-se de que a TodoListApi esteja rodando (por padrão em `https://localhost:7100` ou na porta configurada no Swagger dela) antes de criar conta ou logar.

---

## Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `NEXT_PUBLIC_API_URL` | URL base da TodoListApi | `https://localhost:7100` |

Se a variável não for definida, o front cai no fallback `https://localhost:7100` (ver `src/lib/constants.ts`).

---

## Autenticação

O fluxo de autenticação espelha o da API:

1. **Cadastro** (`/register`) ou **login** (`/login`) — o front envia as credenciais para `POST /api/Auth/register` ou `POST /api/Auth/login`.
2. A API retorna um **token JWT**, que é salvo em cookie (`todolist_token`, expira em 8 horas — igual ao tempo de vida do token na API).
3. Todas as requisições autenticadas (`apiFetch` em `src/services/api.ts`) enviam o token no header `Authorization: Bearer {token}`.
4. O `proxy.ts` bloqueia acesso a `/tarefas` sem cookie válido e redireciona quem já está logado para longe de `/login`, `/register` e `/`.
5. O `AuthContext` decodifica o token no client (`src/lib/jwt.ts`) para extrair os dados do usuário e verificar expiração, sem precisar de uma chamada extra à API.
6. **Logout** simplesmente remove o cookie.

---

## Funcionalidades

- Cadastro e login de usuário
- Listagem de tarefas do usuário autenticado
- Criação de tarefa (título, descrição e tipo — Normal/Urgente)
- Edição de tarefa existente
- Marcar/desmarcar tarefa como concluída, com toast e opção de desfazer
- Exclusão de tarefa com modal de confirmação
- Feedback visual de loading e erros de API
- Toasts de sucesso/erro nas ações principais

---

## Rotas

| Rota | Grupo | Descrição | Acesso |
|------|-------|-----------|--------|
| `/` | — | Landing page | Público |
| `/login` | `(auth)` | Formulário de login | Público (redireciona se já autenticado) |
| `/register` | `(auth)` | Formulário de cadastro | Público (redireciona se já autenticado) |
| `/tarefas` | `(app)` | Listagem e gerenciamento de tarefas | Protegido (requer token) |

---

## Design System

Componentes de UI reutilizáveis vivem em `src/components/ui/` e seguem um padrão visual consistente:

- Cantos arredondados (`rounded-xl`/`rounded-2xl`), sombras suaves e paleta baseada em `--primary` (`#0062bf`), `--surface` (branco) e `--background` (`#f3f7fa`), definidas em `src/app/globals.css`.
- Fontes: `Fustat` para títulos (`font-display`) e `Inter Tight` para o corpo (`font-body`).
- Todo elemento clicável tem `cursor-pointer` e transição de cor no hover — o Tailwind reseta o cursor padrão de `<button>`, então isso é aplicado explicitamente em vez de depender do estilo nativo do navegador.
- `Select` é um dropdown customizado (não usa `<select>` nativo) para permitir estilizar a lista de opções — o navegador não permite estilizar o popup de um `<select>` nativo além da caixa fechada.
- Toasts via `sonner`, posicionados no canto inferior direito.

---

## Estrutura de Pastas

```
src/
├── app/
│   ├── (app)/
│   │   ├── layout.tsx              -> Navbar + área logada
│   │   └── tarefas/page.tsx        -> Listagem e CRUD de tarefas
│   ├── (auth)/
│   │   ├── layout.tsx              -> Card centralizado para login/cadastro
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── globals.css                 -> Tokens de tema e fontes
│   ├── layout.tsx                  -> Layout raiz, AuthProvider e Toaster
│   └── page.tsx                    -> Landing page
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── tarefas/
│   │   ├── TarefaCard.tsx          -> Card de tarefa individual
│   │   ├── TarefaForm.tsx          -> Formulário de criação/edição
│   │   ├── TarefaFormModal.tsx     -> Modal com o formulário
│   │   ├── TarefaList.tsx          -> Lista de cards
│   │   └── TipoTarefaBadge.tsx     -> Badge Normal/Urgente
│   └── ui/
│       ├── Button.tsx
│       ├── ConfirmModal.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       └── Select.tsx              -> Dropdown customizado
├── contexts/
│   └── AuthContext.tsx             -> Estado de autenticação (login/registrar/logout)
├── hooks/
│   ├── useAuth.ts                  -> Acesso ao AuthContext
│   ├── useTarefas.ts               -> Listagem e mutações de tarefas
│   └── useTipoTarefas.ts           -> Listagem de tipos de tarefa
├── lib/
│   ├── constants.ts                -> URL da API e nome do cookie
│   ├── cookies.ts                  -> Helpers de cookie no client
│   └── jwt.ts                      -> Decodificação e checagem de expiração do JWT
├── services/
│   ├── api.ts                      -> apiFetch genérico + ApiError
│   ├── authService.ts              -> POST /api/Auth/login e /register
│   ├── tarefaService.ts            -> CRUD de /api/Tarefas
│   └── tipoTarefaService.ts        -> GET /api/TipoTarefas
├── types/
│   ├── auth.ts
│   └── tarefa.ts
└── proxy.ts                        -> Proteção de rotas (equivalente ao middleware)
```

---

## Scripts Disponíveis

```bash
npm run dev      # inicia o servidor de desenvolvimento
npm run build    # gera o build de produção
npm run start    # roda o build de produção
npm run lint     # roda o ESLint
```

---

Desenvolvido por [**Davi Oliveira Brito**](https://www.linkedin.com/in/davi-oliveira-brito-b7267b252/)
