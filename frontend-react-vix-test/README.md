# Frontend React Vix Test

## Tecnologias Usadas

*   **React:** Biblioteca JavaScript para construção de interfaces de usuário.
*   **Vite:** Build tool que visa fornecer uma experiência de desenvolvimento mais rápida e leve para projetos web modernos.
*   **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
*   **Tailwind CSS:** Framework CSS utility-first para estilização rápida.
*   **Material UI (MUI):** Biblioteca de componentes React para um design consistente e bonito.
*   **React Router Dom:** Biblioteca para roteamento no React.
*   **Axios:** Cliente HTTP baseado em promessas para o navegador e Node.js.
*   **React Toastify:** Biblioteca para notificações toast.
*   **i18next:** Framework de internacionalização.
*   **Zustand:** Solução de gerenciamento de estado pequena, rápida e escalável.
*   **Vitest:** Framework de testes unitários nativo do Vite.
*   **Testing Library:** Biblioteca para testar componentes React focada em boas práticas de acessibilidade.

## Funcionalidades Implementadas

### Autenticação
*   **Login (`useLogin` hook):**
    *   Autenticação de usuários com suporte a Username/Email e Senha.
    *   Gerenciamento de estado de carregamento e exibição de mensagens de erro/sucesso via Toast.
    *   Armazenamento seguro de informações do usuário e token no estado global (Zustand).
    *   Redirecionamento automático após login bem-sucedido.
*   **Registro (`useRegister` hook):**
    *   Criação de novas contas de usuário enviando requisição `POST` para `/auth/register`.
    *   **Validação Frontend:** Verifica preenchimento de todos os campos e igualdade entre senha e confirmação de senha antes do envio.
    *   **Feedback:** Exibe mensagens de erro ou sucesso via Toast.
    *   **Fluxo:** Redireciona automaticamente para a tela de Login (`/login`) após o cadastro bem-sucedido.

### Gerenciamento de Estado e UI
*   **Carregamento da Aplicação (`useLoadingApp` hook):**
    *   Gerenciamento do carregamento inicial de temas e configurações da marca (`/brand-master/self`).
    *   Tratamento otimizado de erros 401 (Unauthorized) para evitar alertas desnecessários em páginas públicas (Login/Registro).
*   **Componentes de UI:**
    *   Formulários de Login e Registro estilizados com Material UI e Tailwind.
    *   Suporte a troca de temas (Claro/Escuro) e idiomas.

### Configuração e Estrutura
*   Estrutura de projeto organizada em componentes, hooks, páginas e serviços.
*   Configuração de rotas protegidas e públicas.
*   Integração com API RESTful via serviço de API centralizado (`src/services/api.ts`).

## Testes

O projeto utiliza **Vitest** e **React Testing Library** para garantir a qualidade do código.

*   **Snapshot Testing (`Register.test.tsx`):**
    *   Garante a integridade visual e estrutural da página de Registro.
    *   Utiliza mocks para dependências externas (`useZTheme`, `react-router-dom`, `i18next`) para testar o componente de forma isolada e determinística.
*   **Testes de Componentes (`Contact.test.tsx`):**
    *   Verifica a lógica de renderização de links dinâmicos baseados nas informações da marca (`useZBrandInfo`).
    *   Testa cenários de fallback (links padrão) quando as informações da marca não estão disponíveis.

Para rodar os testes:
```bash
npm run test
```

## Como Rodar o Projeto

Este projeto utiliza **Node.js** e **npm** para gerenciamento de dependências. Certifique-se de ter o Node.js instalado em sua máquina.

### Pré-requisitos

*   Node.js (versão 18 ou superior recomendada)
*   Gerenciador de pacotes (pnpm, npm ou yarn)

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

*   `pnpm dev`: Inicia o servidor de desenvolvimento.
*   `pnpm build`: Compila o projeto para produção (gera a pasta `dist`).
*   `pnpm preview`: Visualiza a versão de produção localmente após o build.
*   `pnpm test`: Executa os testes unitários com Vitest.
*   `pnpm test:coverage`: Executa os testes e gera relatório de cobertura.
*   `pnpm lint`: Executa o ESLint para verificar problemas no código.
*   `pnpm format`: Formata o código usando Prettier.

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