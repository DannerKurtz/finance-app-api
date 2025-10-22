# Finance App API

> 🚧 **Projeto em Desenvolvimento** - Este projeto ainda está em processo de criação.

API REST para gerenciamento financeiro pessoal, permitindo o controle de usuários e transações financeiras (ganhos, despesas e investimentos).

## 🚀 Tecnologias

Este projeto utiliza as seguintes tecnologias e ferramentas:

### Core
- **Node.js** - Ambiente de execução JavaScript
- **Express.js** (v5.1.0) - Framework web para criação da API REST
- **Prisma** (v6.16.3) - ORM para gerenciamento do banco de dados
- **PostgreSQL** - Banco de dados relacional

### Validação e Segurança
- **Zod** (v4.1.11) - Validação de schemas e dados
- **Bcrypt** (v6.0.0) - Hash de senhas
- **Validator** (v13.15.15) - Validação de dados

### Utilitários
- **UUID** (v13.0.0) - Geração de identificadores únicos
- **dotenv** (v17.2.2) - Gerenciamento de variáveis de ambiente

### Desenvolvimento
- **ESLint** (v9.35.0) - Linting de código
- **Prettier** (v3.6.2) - Formatação de código
- **Husky** (v9.1.7) - Git hooks
- **lint-staged** (v16.1.6) - Linting de arquivos staged

### Gerenciador de Pacotes
- **pnpm** (v10.15.1) - Gerenciador de pacotes rápido e eficiente

## 📁 Estrutura do Projeto

```
finance-app-api/
├── src/
│   ├── controllers/        # Controladores da aplicação
│   │   ├── helpers/        # Funções auxiliares
│   │   ├── transactions/   # Controladores de transações
│   │   └── users/          # Controladores de usuários
│   ├── database/           # Configuração do banco de dados
│   │   └── postgres/       # Implementação PostgreSQL
│   ├── errors/             # Tratamento de erros customizados
│   ├── factory/            # Factories para criação de instâncias
│   │   └── controller/     # Factories de controladores
│   ├── repositories/       # Camada de acesso a dados
│   │   └── postgres/       # Repositórios PostgreSQL
│   ├── schemas/            # Schemas de validação (Zod)
│   ├── use-cases/          # Casos de uso (regras de negócio)
│   │   ├── transactions/   # Casos de uso de transações
│   │   └── user/           # Casos de uso de usuários
│   └── index.js            # Arquivo principal da aplicação
├── prisma/
│   ├── schema.prisma       # Schema do Prisma
│   └── migrations/         # Migrações do banco de dados
├── docker-compose.yml      # Configuração do Docker
└── package.json            # Dependências e scripts
```

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas com separação clara de responsabilidades:

- **Controllers**: Recebem as requisições HTTP e retornam as respostas
- **Use Cases**: Contêm a lógica de negócio da aplicação
- **Repositories**: Responsáveis pelo acesso e manipulação dos dados
- **Schemas**: Validação de entrada de dados usando Zod
- **Factory**: Padrão Factory para criação de instâncias dos controladores

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (v10.15.1 ou superior)
- Docker e Docker Compose (para rodar o banco de dados)
- PostgreSQL (caso prefira rodar localmente sem Docker)

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
DATABASE_URL="postgresql://root:password@localhost:5432/financeapp"
```

4. Inicie o banco de dados com Docker:
```bash
docker-compose up -d
```

Isso irá iniciar:
- PostgreSQL na porta 5432
- pgAdmin na porta 8080 (acesse em http://localhost:8080)
  - Email: admin@admin.com
  - Senha: admin

5. Execute as migrações do banco de dados:
```bash
pnpm migration:run
```

## 🎮 Scripts Disponíveis

```bash
# Iniciar o servidor em modo de desenvolvimento (com auto-reload)
pnpm start:dev

# Executar migrações do banco de dados
pnpm migration:run

# Executar testes (ainda não implementado)
pnpm test
```

## 📡 Endpoints da API

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/users` | Criar novo usuário |
| GET | `/api/users/:userId` | Buscar usuário por ID |
| PATCH | `/api/users/:userId` | Atualizar usuário |
| DELETE | `/api/users/:userId` | Deletar usuário |
| GET | `/api/users/:userId/balance` | Obter saldo do usuário |

### Transações

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/transactions` | Listar transações |
| POST | `/api/transactions` | Criar nova transação |
| PATCH | `/api/transactions/:transactionId` | Atualizar transação |
| DELETE | `/api/transactions/:transactionId` | Deletar transação |

### Tipos de Transação

- `EARNING` - Ganhos/Receitas
- `EXPENSE` - Despesas
- `INVESTMENT` - Investimentos

## 🗄️ Modelo de Dados

### User (Usuário)
- `id`: UUID (gerado automaticamente)
- `first_name`: String (máx. 50 caracteres)
- `last_name`: String (máx. 50 caracteres)
- `email`: String único (máx. 100 caracteres)
- `password`: String hasheada (máx. 255 caracteres)

### Transaction (Transação)
- `id`: UUID (gerado automaticamente)
- `user_id`: UUID (referência ao usuário)
- `name`: String (máx. 50 caracteres)
- `date`: Date
- `amount`: Decimal (10,2)
- `type`: Enum (EARNING, EXPENSE, INVESTMENT)

## 🛠️ Desenvolvimento

### Code Quality

O projeto utiliza ferramentas de qualidade de código:

- **ESLint**: Análise estática de código
- **Prettier**: Formatação automática de código
- **Husky**: Git hooks para garantir qualidade antes dos commits
- **lint-staged**: Executa linters apenas nos arquivos modificados

### Rodando em Modo de Desenvolvimento

```bash
pnpm start:dev
```

O servidor irá reiniciar automaticamente quando houver mudanças nos arquivos.

## 🐳 Docker

O projeto inclui um `docker-compose.yml` que configura:

- **PostgreSQL**: Banco de dados principal
- **pgAdmin**: Interface web para gerenciar o PostgreSQL

Para iniciar os serviços:
```bash
docker-compose up -d
```

Para parar os serviços:
```bash
docker-compose down
```

## 📝 Licença

ISC

## 👨‍💻 Autor

DannerKurtz

---

**Status do Projeto**: 🚧 Em Desenvolvimento Ativo
