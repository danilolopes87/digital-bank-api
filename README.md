## 📂 **Sobre o Projeto**

Esta é uma API RESTful do sistema bancário da Cubos, desenvolvida para oferecer serviços financeiros eficientes e seguros. Baseada em Node.js, Express.js, e MongoDB, a API implementa operações bancárias padrão, como criação de contas, transferências e consulta de saldo. Ela segue os princípios REST e utiliza práticas de segurança avançadas.

Todas as informações necessárias para compreender o funcionamento da API e para utilizá-la estão detalhadas abaixo, juntamente com suas especificações técnicas.

## 🛠️ **Bibliotecas e Tecnologias**

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
<img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white" alt="Git logo" width="68" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" alt="npm logo" width="40" />

🕹️ **Funcionalidades**
A API oferece uma variedade de funcionalidades bancárias essenciais, incluindo:

**Clientes**

- Cadastrar Cliente
- Detalhar Cliente
- Editar Cliente
- Listar Clientes

**Contas Bancárias**

- Criar Conta
- Detalhar Conta
- Listar Contas
- Editar Conta

**Transações**

- Realizar Transferência
- Consultar Extrato
- Visualizar Saldo


## Como Instalar

1. Clone este repositório para qualquer pasta de sua preferência:
   
    git clone https://github.com/danilolopes87/digital-bank-api

2. Abra seu terminal na pasta do repositório e execute o comando:


    npm install


## 📌**Endpoints**

### **Listar contas bancárias**

#### `GET` `/contas?senha_banco=123`

Essa é a rota que será utilizada para listar todas as contas bancárias existentes.

-   **Requisição**  

    Parâmetro do tipo query **`senha_banco`**.  
    Não deverá possuir conteúdo no corpo (body) da requisição.

-   **Resposta**
  
    Em caso de sucesso, o corpo (body) da resposta conterá um array de objetos representando as contas encontradas.

    Em caso de falha na validação, a resposta terá um status code apropriado, e seu corpo (body) conterá um objeto com a propriedade mensagem, que explicará o motivo da falha.

#### **Exemplo de requisição**

```
// GET /contas?senha_banco=senha-do-banco
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```
[
    {
        numero: "1",
        saldo: 100000,
        usuario: {
            nome: 'Nome Qualquer',
            cpf: '00011122233',
            data_nascimento: '2001-03-15',
            telefone: '71999998888',
            email: 'emailqualquer@email.com',
            senha: '1234'
        }
    },
]
```

#### `POST` `/contas`

Essa é a rota que será utilizada para criar uma conta bancária, onde será gerado um número único para identificação de cada conta.

#### **Exemplo de requisição**

```
// [POST] /contas
{
    "nome": "Nome Qualquer",
    "email": "emailqualquer@email.com",
    "cpf": "00011122233",
    "data_nascimento": "15/03/2001",
    "telefone": "71999998888",
    "senha": "1234"
}
```

#### **Exemplos de resposta**

```
{
    numero:  "1",
    saldo: 0,
    usuario: {
        nome: 'Nome Qualquer',
        cpf: '00011122233',
        data_nascimento: '2001-03-15',
        telefone: '71999998888',
        email: 'emailqualquer@email.com',
        senha: '1234'
    }
}
```

### **Atualizar usuário da conta bancária**

#### `PUT` `/contas/:numeroConta/usuario`

Essa é a rota que será utilizada para atualizar os dados do usuário de uma conta bancária.
