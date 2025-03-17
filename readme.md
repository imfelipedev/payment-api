# API Payment

Este projeto é uma API para criar pagamentos PIX, construída utilizando os princípios da Clean Architecture. A arquitetura separa claramente as responsabilidades em Domínio, Aplicação, Infraestrutura e Apresentação, permitindo uma manutenção e evolução facilitadas.

## Sumário

-   [Visão Geral](#visão-geral)
-   [Estrutura do Projeto](#estrutura-do-projeto)
-   [Rotas da API](#rotas-da-api)
    -   [Criar Pagamento](#criar-pagamento)
    -   [Atualizar Pagamento](#atualizar-pagamento)
-   [Pré-requisitos](#pré-requisitos)
-   [Instalação](#instalação)
-   [Execução](#execução)
-   [Docker](#docker)
-   [Testes](#testes)
-   [Contribuições](#contribuições)
-   [Licença](#licença)

## Visão Geral

A API cria pagamentos integrando com o MercadoPago e persiste os dados utilizando Prisma.  
A separação de camadas é feita da seguinte forma:

-   **Domínio:** Entidades e regras de negócio (ex.: Payment).
-   **Aplicação:** Casos de uso, DTOs, interfaces e tratamento de erros.
-   **Infraestrutura:** Implementação de repositórios (Prisma), integração com serviços externos (MercadoPago) e composição do servidor Fastify.
-   **Apresentação:** Controllers e middlewares para a interface HTTP.

## Estrutura do Projeto

```plaintext
/api-payment
├── domain
│   └── payment
│       ├── entities
│       │   └── payment.entity.ts
│       ├── gateway
│       │   └── payment.gateway.ts
│       └── repositories
│           └── payment.repository.ts
├── application
│   ├── usecases
│   │   └── payment
│   │       ├── create-payment.usecase.ts
│   │       └── update-payment.usecase.ts
│   ├── errors
│   │   ├── service.error.ts
│   │   ├── notfound.error.ts
│   │   └── validation.error.ts
│   └── dtos
│       ├── mercadopago
│       │   ├── get-mercadopago.dto.ts
│       │   └── create-mercadopago.dto.ts
│       └── payment
│           └── create-payment.dto.ts
├── infrastructure
│   ├── http
│   │   └── server.ts
│   ├── database
│   │   └── prisma.ts
│   ├── gateway
│   │   └── payment.gateway.mercadopago.ts
│   └── repositories
│       └── payment.repository.prisma.ts
├── presentation
│   ├── controllers
│   │   ├── create-payment.controller.ts
│   │   └── update-payment.controller.ts
│   └── middlewares
│       └── error.middleware.ts
├── prisma
│   └── schema.prisma
└── .env
```

## Rotas da API

### Criar Pagamento

-   **URL:** `/api/v1/payment`
-   **Método:** `POST`
-   **Descrição:** Cria um novo pagamento.
-   **Parâmetros:**
    -   **Body:**
        ```json
        {
            "price": 100.0,
            "owner": "ID da conta.",
            "email": "Email da conta.",
            "document": "CPF da conta."
        }
        ```
-   **Resposta de Sucesso:**
    -   **Status:** `201 Created`
    -   **Body:**
        ```json
        {
            "id": "uuid",
            "qr_code": "pix copia e cola.",
            "qr_code_base64": "base64..."
        }
        ```

### Atualizar Pagamento

-   **URL:** `/api/v1/payment/update`
-   **Método:** `POST`
-   **Descrição:** Atualiza um pagamento existente.
-   **Parâmetros:**

    -   **Body:**

        ```json
        {
            "action": "payment.update",
            "data": {
                "id": "uuid"
            }
        }
        ```

-   **Resposta de Sucesso:**
    -   **Status:** `200 OK`
    -   **Body:**
        ```json
        {
            "success": true
        }
        ```

## Pré-requisitos

-   Docker e Docker Compose instalados

## Instalação

1. Clone o repositório:

```bash
git clone <URL-do-repositório>
```

2. Configure o arquivo `.env` com as variáveis necessárias (credenciais do MercadoPago, URL do banco de dados, porta do servidor etc.).

### Variáveis de Ambiente

-   `MERCADOPAGO_ACCESS_TOKEN`: Token de acesso do MercadoPago.
-   `DATABASE_URL`: URL de conexão com o banco de dados.
-   `SERVER_PORT`: Porta em que o servidor será executado.

## Execução

Para iniciar a API utilizando Docker:

1. Execute o Docker Compose para iniciar os serviços:

```bash
docker-compose up
```

A API ficará disponível na porta configurada no arquivo `.env`.

## Testes

Para executar a bateria de testes:

```bash
docker-compose exec app npm test
```

## Contribuições

Contribuições são bem-vindas! Abra uma issue ou envie um pull request com melhorias.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
