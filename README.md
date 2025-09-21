# TRABALHO-PGATS-API-TESTS

# API de Cursos

Esta API permite login, registro de usuários, consulta de usuários e inscrição em cursos, com regras básicas para aprendizado de testes e automação de API.

## Instalação

1. Instale as dependências:
   ```bash
   npm install express swagger-ui-express
   ```
2. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
   ```
    BASE_URL_REST="http://localhost:PORTA"
    BASE_URL_GRAPHQL="http://localhost:PORTA"
   ```
   # Para GraphQL:
   npm install apollo-server-express graphql jsonwebtoken dotenv

## Como rodar

```bash
node src/server.js
```

A API estará disponível em `http://localhost:3000`.

## Como rodar a API GraphQL

```bash
node src/graphql/server.js
```

A API GraphQL estará disponível em `http://localhost:4000/graphql`.

## Endpoints


## GraphQL

### Types principais
- User: username, curso, favorecidos, saldo
- Transfer: from, to, value
- AuthPayload: token, user

### Queries
- users: Lista todos os usuários
- user(username): Busca usuário por nome

### Mutations
- login(username, password): retorna token JWT
- register(username, password): registra usuário
- enroll(username, curso): inscreve usuário em curso (JWT obrigatório)
- transfer(from, to, value): transfere valor entre usuários (JWT obrigatório)

### Autenticação
Para Mutations sensíveis (enroll, transfer), inclua o header:
```
Authorization: Bearer <seu_token_jwt>
```

## Regras de negócio

- Login exige usuário e senha.
- Não é possível registrar usuários duplicados.
- Cada aluno só pode se inscrever em um curso.
- Banco de dados em memória (variáveis).

## Testes

Para testar a API, utilize ferramentas como Postman, Insomnia ou scripts automatizados com Supertest.

Para testar a API GraphQL, utilize o playground ApolloServer ou ferramentas como Insomnia/Postman (modo GraphQL).

## Documentação

Acesse `/api-docs` para visualizar e testar os endpoints via Swagger UI.

Para GraphQL, acesse `/graphql` para o playground ApolloServer.
