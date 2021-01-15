# Inicio

<br />
<br />
<br />

- [Arquitetura e estrutura de pastas](#Arquitetura)
- [Tecnologias utilizadas](#Tecnologias)
- [Instrucoes para instalar](#Instalacao)
- [Instrucoes para rodar](#Iniciando)
- [Testes unitários](#Testes)
- [Documentação dos endpoints](#Documentação)

<br />
<br />
<br />

# Arquitetura

Utilizei alguns padrões de DDD, [Clean Architeture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), CQRS, e algumas adaptações, a estrutura de pasta se encontrada seguinte maneira:

- **Common**:

Módulo comum, algo como shared, etc, posso utilizar os componentes desse módulo em toda a minha aplicação.

- **Environment**:

Módulo que contém somente variaveis de ambiente

- **Infra**:

Módulo de infraestrutura, com configuracoes de servidor, bando de dados, log, etc.

- **Modulos**:

Pasta que contém módulos da minha aplicação, sendo cada módulo composto por casos de uso, dominio, routers, controllers (para manter coesão do módulo na hora de manutenção dos casos de uso, etc).

<br />
<br />

# Tecnologias

**Linguagem: Node**.js.  
**Banco de dados**: MongoDb.  
**Ferramentas**: Typescript, VSCode.  
**Testes Unitarios**: Jest

<br />
<br />

# Instalacao

> Com o projeto local, basta rodar o comando `npm i`.

<br />
<br />

# Iniciando

> Se deseja buildar e rodar basta rodar o comando `npm start`

<br />

> Se deseja rodar no modo watch, (restart a cada save) o comando é `npm run start:watch`

<br />
<br />

# Testes

> Comando: `npm run test`

<br />
<br />

# Documentação

Com a api rodando, basta acessar o endpoint `/api/docs` configurei para iniciar na porta `8080` então a URL completa fica assim: `http://localhost:8080/api/docs`
