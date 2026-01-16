# Frontend React Vix Test

## Tecnologias Usadas

- **React:** Biblioteca JavaScript para construção de interfaces de usuário.
- **Vite:** Build tool que visa fornecer uma experiência de desenvolvimento mais rápida e leve para projetos web modernos.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Tailwind CSS:** Framework CSS utility-first para estilização rápida.
- **Material UI (MUI):** Biblioteca de componentes React para um design consistente e bonito.
- **React Router Dom:** Biblioteca para roteamento no React.
- **Axios:** Cliente HTTP baseado em promessas para o navegador e Node.js.
- **React Toastify:** Biblioteca para notificações toast.
- **i18next:** Framework de internacionalização.
- **Zustand:** Solução de gerenciamento de estado pequena, rápida e escalável.
- **Vitest:** Framework de testes unitários nativo do Vite.
- **Testing Library:** Biblioteca para testar componentes React focada em boas práticas de acessibilidade.

## Funcionalidades Implementadas

### Gerenciamento de VMs na Home Page

A Home Page agora inclui cards de máquinas virtuais (VMs) com funcionalidades aprimoradas para gerenciamento direto:

- **Gerenciamento de Status da VM:** Inicie (`start`), pause (`pause`) ou pare suas VMs diretamente do card, com uma etapa de confirmação para evitar ações acidentais.
- **Edição de Nome da VM:** Renomeie suas VMs através de um modal acessível pelo card.
- **Ajuste de Tamanho de Disco da VM:** Modifique o tamanho do disco das suas VMs usando um slider e um aviso de confirmação.
- **Controle de Acesso Baseado em Função (RBAC):** As ações de gerenciamento de VM (alteração de status, edição de nome e ajuste de disco) são desativadas para usuários com o perfil de "membro", sendo restritas a perfis com privilégios mais altos (ex: administrador).
- **Exibição Aprimorada de Informações da VM:** Cada card de VM exibe detalhes essenciais como Nome da VM, Status, CPU, Memória, Disco, Sistema Operacional e Proprietário.
- **Atualizações de Status em Tempo Real e Monitoramento de Tarefas:** Os cards exibem o status em tempo real e informações sobre tarefas pendentes (ex: operações de desligamento ou inicialização), fornecendo feedback imediato ao usuário.
- **Integração com Hooks de Recurso de VM:** As funcionalidades utilizam `useVmResource` para interações com a API (atualização de nome, tamanho de disco e status da VM) e `useListVms` para buscar e gerenciar a lista de VMs.
- **Indicadores Visuais de Estado da VM:** O status é claramente indicado, e os botões de ação refletem dinamicamente o estado atual da VM e quaisquer tarefas pendentes.
- **Links para Métricas e Gerenciamento de VM:** Botões para "Show Graph" (Mostrar Gráfico), "Terminal" e "Monitor" estão disponíveis, conectando a interfaces detalhadas de métricas e gerenciamento para as VMs. Os gráficos de **Uso de CPU** e **Uso de Memória** são apresentados com dados mocados.

### Autenticação

- **Login (`useLogin` hook):**
  - Autenticação de usuários com suporte a Username/Email e Senha.
  - Gerenciamento de estado de carregamento e exibição de mensagens de erro/sucesso via Toast.
  - Armazenamento seguro de informações do usuário e token no estado global (Zustand).
  - Redirecionamento automático após login bem-sucedido.
- **Registro (`useRegister` hook):**
  - Criação de novas contas de usuário enviando requisição `POST` para `/auth/register`.
  - **Validação Frontend:** Verifica preenchimento de todos os campos e igualdade entre senha e confirmação de senha antes do envio.
  - **Feedback:** Exibe mensagens de erro ou sucesso via Toast.
  - **Fluxo:** Redireciona automaticamente para a tela de Login (`/login`) após o cadastro bem-sucedido.

### Roteamento e Segurança

O sistema de rotas utiliza o `react-router-dom` e implementa uma camada de segurança robusta através do componente `PrivatePage` (`src/auth/PrivatePage.tsx`).

- **Componente `PrivatePage`:** Atua como um wrapper para todas as rotas protegidas.
- **Verificação de Autenticação:** Verifica se o usuário possui um `idUser` válido no estado global (`useZUserProfile`). Caso contrário, redireciona automaticamente para `/login`.
- **Controle de Acesso por Função (RBAC):**
  - **`onlyAdmin`:** Restringe o acesso apenas a usuários com role 'admin'.
  - **`onlyManagerOrAdmin`:** Permite acesso a 'manager' e 'admin'.
  - Caso o usuário não tenha permissão, ele é redirecionado para a página anterior.
- **Rotas Públicas:** `/login` e `/register` (envolvidas pelo `LoadingApp` para carregar configurações iniciais sem exigir auth).
- **Rotas Privadas:** Todas as demais rotas internas, incluindo a rota de "404 Not Found", garantindo que a estrutura interna não seja exposta a usuários não autenticados.

### Gerenciamento de Estado e UI

- **Carregamento da Aplicação (`useLoadingApp` hook):**
  - Gerenciamento do carregamento inicial de temas e configurações da marca (`/brand-master/self`).
  - Tratamento otimizado de erros 401 (Unauthorized) para evitar alertas desnecessários em páginas públicas (Login/Registro).
- **Componentes de UI:**
  - Formulários de Login e Registro estilizados com Material UI e Tailwind.
  - Suporte a troca de temas (Claro/Escuro) e idiomas.

### Configuração e Estrutura

- Estrutura de projeto organizada em componentes, hooks, páginas e serviços.
- Configuração de rotas protegidas e públicas.
- Integração com API RESTful via serviço de API centralizado (`src/services/api.ts`).

## Testes

O projeto utiliza **Vitest** e **React Testing Library** para garantir a qualidade do código.

- **Snapshot Testing (`Register.test.tsx`):**
  - Garante a integridade visual e estrutural da página de Registro.
  - Utiliza mocks para dependências externas (`useZTheme`, `react-router-dom`, `i18next`) para testar o componente de forma isolada e determinística.
- **Testes de Componentes (`Contact.test.tsx`):**
  - Verifica a lógica de renderização de links dinâmicos baseados nas informações da marca (`useZBrandInfo`).
  - Testa cenários de fallback (links padrão) quando as informações da marca não estão disponíveis.

Para rodar os testes:

```bash
npm run test
```

## Como Rodar o Projeto

Este projeto utiliza **Node.js** e **npm** para gerenciamento de dependências. Certifique-se de ter o Node.js instalado em sua máquina.

### Pré-requisitos

- Node.js (versão 18 ou superior recomendada)
- Gerenciador de pacotes (pnpm, npm ou yarn)

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd frontend-react-vix-test
    ```

2.  **Instale as dependências:**
    Recomendamos o uso do `pnpm`.

    ```bash
    pnpm install
    # ou
    npm install
    # ou
    yarn install
    ```

3.  **Configuração de Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto baseado no `.env.exemple` (se houver) ou configure as variáveis necessárias, como a URL da API.

    ```env
    VITE_BASE_URL=http://localhost:3001/api/v1
    ```

4.  **Rodar o Servidor de Desenvolvimento:**
    Para iniciar o projeto em modo de desenvolvimento com hot-reload:
    ```bash
    pnpm dev
    # ou
    npm run dev
    ```
    O servidor será iniciará em `http://localhost:3000`.

### Scripts Disponíveis

- `pnpm dev`: Inicia o servidor de desenvolvimento.
- `pnpm build`: Compila o projeto para produção (gera a pasta `dist`).
- `pnpm preview`: Visualiza a versão de produção localmente após o build.
- `pnpm test`: Executa os testes unitários com Vitest.
- `pnpm test:coverage`: Executa os testes e gera relatório de cobertura.
- `pnpm lint`: Executa o ESLint para verificar problemas no código.
- `pnpm format`: Formata o código usando Prettier.

### Rodando com Docker (Opcional)

Se preferir rodar via Docker Compose:

```bash
docker compose up -d --build
```

Isso irá construir a imagem e subir o container da aplicação.
Para parar:

```bash
docker compose down
```

## Documentação de CI e Testes

### Integração Contínua (CI)

O projeto utiliza o GitLab CI para automação de build, testes e deploy. A configuração está definida no arquivo `.gitlab-ci.yml`.

#### Estrutura do Pipeline

O pipeline está dividido nos seguintes estágios:

1.  **build**: Instalação de dependências e compilação do projeto.
2.  **test**: Execução dos testes automatizados e verificação de cobertura de código.
3.  **deploy**: Implantação da aplicação em ambientes específicos (staging/produção).

#### Jobs e Branches

| Branch Trigger (Regex) | Jobs Executados                                 | Descrição                                                                                      |
| :--------------------- | :---------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| `feature/*`            | `build_feature`, `test_feature`                 | Pipelines para desenvolvimento de novas funcionalidades. Executa build e testes com cobertura. |
| `sprint-ref/*`         | `build_sprint`, `test_sprint`, `deploy_staging` | Pipelines para branches de sprint. Inclui deploy para o ambiente de **staging**.               |
| `hotfix/*`             | `build_hotfix`, `test_hotfix`                   | Pipelines para correções urgentes. Executa build e testes.                                     |
| `project-ref/*b`       | `build_project_hotfix`, `test_project_hotfix`   | Pipelines para correções de projeto específicas. Executa build e testes.                       |
| `main`                 | `deploy_main_after_hotfix`                      | Pipeline executado na branch principal para deploy em **produção** após hotfix.                |

#### Configuração dos Jobs de Teste

Todos os jobs de teste (`test_feature`, `test_sprint`, etc.) compartilham a seguinte configuração base:

- **Imagem Docker**: `node:16`
- **Script**:
  ```bash
  npm install
  npm run test:coverage
  ```
- **Regex de Cobertura**: Captura a porcentagem de cobertura da saída do console (`/All files[^|]*\|[^|]*\s+([\d\.]+)%/`).

---

### Testes Automatizados (Login e Register)

Os testes foram implementados utilizando **Vitest** e **React Testing Library**. Eles cobrem renderização, snapshots e lógicas de interação de formulário.

#### Estrutura de Testes

Os testes estão localizados no diretório `tests/` e espelham a estrutura de `src/`.

#### 1. Testes de Login

**Arquivo:** `tests/pages/Login/Login.test.tsx`

- **Tipo**: Teste de Unidade / Snapshot.
- **Cobertura**:
  - Verifica se a página renderiza sem erros (`should render without crashing`).
  - Verifica se a estrutura visual permanece consistente (`should match snapshot`).
- **Mocks**:
  - `useZTheme`: Simula o tema da aplicação.
  - `react-router-dom`: Simula `Link`, `useNavigate` e `useLocation`.
  - `react-i18next`: Simula traduções (`t`, `i18n`, `Trans`).

**Arquivo:** `tests/pages/Login/components/MainLoginForm/MainLoginForm.test.tsx`

- **Tipo**: Teste de Componente (Unidade).
- **Cobertura**:
  - Verifica a interatividade do checkbox "Manter conectado".
  - Testa o toggle de estado (checked/unchecked) ao clicar.
- **Mocks**: `useZTheme`, `react-i18next`.

#### 2. Testes de Registro (Register)

**Arquivo:** `tests/pages/Register/Register.test.tsx`

- **Tipo**: Teste de Unidade / Snapshot.
- **Cobertura**:
  - Verifica a consistência visual da página de registro (`should match snapshot`).
- **Mocks**:
  - `useZTheme`: Simula o tema.
  - `react-router-dom`: Simula componentes de navegação.
  - `react-i18next`: Simula traduções.

**Arquivo:** `tests/pages/Register/components/MainRegisterForm/RegisterForm.test.tsx`

- **Tipo**: Teste de Integração (Lógica de Formulário).
- **Cobertura**:
  - **Renderização**: Verifica se todos os campos (usuário, email, senha, confirmar senha) estão presentes.
  - **Interação**: Verifica se é possível digitar nos campos de usuário e senha.
  - **Validação de Email**:
    - Exibe erro para email inválido no evento `blur`.
    - Garante que o erro não aparece para email válido.
  - **Validação de Senha**:
    - Exibe erro quando as senhas não coincidem (mismatch) no evento `blur`.
    - Não exibe erro quando as senhas são idênticas.
- **Mocks**: `useZTheme`, `react-i18next`.

#### Como Executar os Testes Localmente

Para rodar os testes em sua máquina:

```bash
# Rodar todos os testes
npm run test

# Rodar com relatório de cobertura
npm run test:coverage
```
