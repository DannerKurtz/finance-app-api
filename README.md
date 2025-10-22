# Finance App API

API REST para gerenciamento de finanças pessoais, desenvolvida com Node.js, Express e Prisma ORM.

## 📋 Sobre o Projeto

Esta API fornece endpoints para gerenciar usuários e transações financeiras, permitindo controle completo de entradas, despesas e investimentos.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados
- **Docker** - Containerização
- **Zod** - Validação de schemas
- **bcrypt** - Hash de senhas
- **Validator** - Validação de dados

## 📦 Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (versão 10.15.1)
- Docker e Docker Compose

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/DannerKurtz/finance-app-api.git
cd finance-app-api
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto
cp .env.example .env
```

Exemplo de variáveis de ambiente necessárias:
```env
PORT=3000
DATABASE_URL="postgresql://root:password@localhost:5432/financeapp?schema=public"
```

4. Inicie o banco de dados com Docker:
```bash
docker-compose up -d
```

5. Execute as migrações do Prisma:
```bash
pnpm migration:run
```

## 🏃 Executando o Projeto

### Modo Desenvolvimento
```bash
pnpm start:dev
```

O servidor estará rodando em `http://localhost:3000`

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL com as seguintes configurações padrão no Docker Compose:

- **Banco de dados**: `financeapp`
- **Usuário**: `root`
- **Senha**: `password`
- **Porta**: `5432`

### pgAdmin
Interface de administração do PostgreSQL disponível em `http://localhost:8080`
- **Email**: admin@admin.com
- **Senha**: admin

## 📚 API Endpoints

### Usuários

#### Criar Usuário
```http
POST /api/users
Content-Type: application/json

{
  "first_name": "João",
  "last_name": "Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

#### Obter Usuário por ID
```http
GET /api/users/:userId
```

#### Atualizar Usuário
```http
PATCH /api/users/:userId
Content-Type: application/json

{
  "first_name": "João",
  "last_name": "Silva"
}
```

#### Obter Saldo do Usuário
```http
GET /api/users/:userId/balance
```

#### Deletar Usuário
```http
DELETE /api/users/:userId
```

### Transações

#### Listar Transações
```http
GET /api/transactions?userId=:userId
```

#### Criar Transação
```http
POST /api/transactions
Content-Type: application/json

{
  "user_id": "uuid-do-usuario",
  "name": "Salário",
  "date": "2024-01-15",
  "amount": 5000.00,
  "type": "EARNING"
}
```

Tipos de transação disponíveis:
- `EARNING` - Entrada
- `EXPENSE` - Despesa
- `INVESTMENT` - Investimento

#### Atualizar Transação
```http
PATCH /api/transactions/:transactionId
Content-Type: application/json

{
  "name": "Salário Atualizado",
  "amount": 5500.00
}
```

#### Deletar Transação
```http
DELETE /api/transactions/:transactionId
```

## 🏗️ Estrutura do Projeto

```
finance-app-api/
├── src/
│   ├── controllers/      # Controladores da aplicação
│   ├── database/         # Configurações de banco de dados
│   ├── errors/           # Classes de erro customizadas
│   ├── factory/          # Factories para criação de instâncias
│   ├── repositories/     # Camada de acesso a dados
│   ├── schemas/          # Schemas de validação Zod
│   ├── use-cases/        # Casos de uso (lógica de negócio)
│   └── index.js          # Arquivo principal da aplicação
├── prisma/
│   ├── schema.prisma     # Schema do banco de dados
│   └── migrations/       # Migrações do banco
├── docker-compose.yml    # Configuração Docker
├── package.json          # Dependências do projeto
└── README.md             # Este arquivo
```

## 🧪 Testes

```bash
pnpm test
```

## 🎨 Linting e Formatação

O projeto utiliza ESLint e Prettier para manter a qualidade do código.

- **ESLint**: Análise estática de código
- **Prettier**: Formatação automática
- **Husky**: Git hooks para validação pré-commit
- **lint-staged**: Executa linters apenas nos arquivos modificados

## 🔒 Modelo de Dados

### User (Usuário)
- `id`: UUID (chave primária)
- `first_name`: String (máx. 50 caracteres)
- `last_name`: String (máx. 50 caracteres)
- `email`: String único (máx. 100 caracteres)
- `password`: String hash (máx. 255 caracteres)

### Transaction (Transação)
- `id`: UUID (chave primária)
- `user_id`: UUID (chave estrangeira para User)
- `name`: String (máx. 50 caracteres)
- `date`: Date
- `amount`: Decimal (10,2)
- `type`: Enum (EARNING, EXPENSE, INVESTMENT)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Autor

Desenvolvido por Danner Kurtz
