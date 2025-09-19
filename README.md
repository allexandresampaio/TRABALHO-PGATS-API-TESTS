# TRABALHO-PGATS-API-TESTS

# API de Cursos

Esta API permite login, registro de usuários, consulta de usuários e inscrição em cursos, com regras básicas para aprendizado de testes e automação de API.

## Instalação

1. Instale as dependências:
   ```bash
   npm install express swagger-ui-express
   ```

## Como rodar

```bash
node src/server.js
```

A API estará disponível em `http://localhost:3000`.

## Endpoints

- `POST /api/auth/login` — Login de usuário
- `POST /api/users/register` — Registro de usuário
- `GET /api/users` — Consulta de usuários
- `GET /api/courses` — Consulta de cursos
- `POST /api/courses/enroll` — Inscrição em curso
- `GET /api-docs` — Documentação Swagger

## Regras de negócio

- Login exige usuário e senha.
- Não é possível registrar usuários duplicados.
- Cada aluno só pode se inscrever em um curso.
- Banco de dados em memória (variáveis).

## Testes

Para testar a API, utilize ferramentas como Postman, Insomnia ou scripts automatizados com Supertest.

## Documentação

Acesse `/api-docs` para visualizar e testar os endpoints via Swagger UI.
