# Backend Node API – Teste Técnico

API desenvolvida em **Node.js com TypeScript** como parte do teste técnico da **Vituax**. O projeto segue boas práticas de arquitetura, validação, versionamento e qualidade de código, com foco em clareza, segurança e testabilidade.

---

## 🚀 Tecnologias Utilizadas

* **Node.js** – Ambiente de execução
* **TypeScript** – Tipagem estática e segurança
* **Express** – Framework HTTP
* **Zod** – Validação e tipagem de dados
* **JWT (JSON Web Token)** – Autenticação
* **ESLint** – Padronização e análise estática
* **Prettier** – Formatação de código
* **Swagger** – Documentação da API
* **Jest** – Testes unitários e de integração
* **ts-node-dev** – Ambiente de desenvolvimento

---

## 🧱 Arquitetura

O projeto adota uma separação clara de responsabilidades:

* **Controllers** – Camada HTTP (request/response)
* **Services** – Regras de negócio
* **Models/Repositories** – Acesso a dados
* **Schemas (Zod)** – Validação e tipagem de entrada
* **Middlewares** – Autenticação, erros e validações

Essa abordagem facilita manutenção, testes e escalabilidade.

---

## 🧪 Qualidade de Código

Para garantir legibilidade, consistência e boas práticas, o projeto utiliza **ESLint** e **Prettier**.

Antes de abrir um Pull Request, execute:

```bash
npm run lint
npm run lint:fix
npm run format
```

---

## 🧪 Testes

O projeto conta com **testes unitários e de integração**, garantindo confiabilidade e segurança da aplicação.

### Cobertura atual

* ✅ Rotas de CRUD para usuários
* ✅ Registro de usuário
* ✅ Autenticação (login)
* ✅ Geração e validação de JWT
* ✅ Cenários de sucesso e erro nas rotas
* ✅ Validação de dados de entrada

### Executar os testes

```bash
npm test
```

### Executar em modo watch

```bash
npm run test:dev
```

---

## 📦 Instalação

Instale as dependências do projeto:

```bash
npm install
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3001
JWT_SECRET=your_secret_key
```

---

## 🚀 Executando a Aplicação

### Ambiente de desenvolvimento

```bash
npm run dev
```

A API estará disponível em:

```
http://localhost:3001
```

---

## 📚 Documentação da API

A documentação interativa está disponível via **Swagger** após iniciar o projeto:

```
http://localhost:3001/docs
```

---

## ✅ Padrão de Commits

O projeto segue o padrão **Conventional Commits**, por exemplo:

* `feat: adiciona autenticação jwt`
* `fix: corrige validação de login`
* `test: adiciona testes unitários de autenticação`
* `refactor: melhora estrutura do service de usuários`

---

## 📌 Observações Finais

Este projeto foi desenvolvido com foco em:

* Clareza de código
* Boas práticas de backend
* Segurança
* Testabilidade
* Manutenibilidade
