import express from 'express'

const app = express()

app.use(express.json()) // p/ express entender json

// Rota = conjunto
// Recurso = usuário

// Métodos HTTP = GET, POST, PUT, DELETE
// PARÂMETROS

// GET = Buscar uma informação (lista, item)
// POST = Criando uma informação
// PUT = Editando uma informação
// DELETE = Deletando uma informação

// Navegador por padrão faz requisições get
// P/ outros métodos usa-se programas como o insominia

// Query Params: http://localhost:3333/users?search=diego
// Route Params: http://localhost:3333/users/1 (identificar um recurso)
// Body: http://localhost:3333/users (Identificar um recurso) normalmente é usado para reqs de forms


app.post('/users/:id', (req,res)=> {

    // console.log(req.query) -> mostra { search: 'dudu'}
    // console.log(req.params) -> mostra {id: '1'}
    // console.log(req.body) -> mostra a req do insomnia {"name": "dudu"}
    // console.log(req.body.name) -> mostra dudu
    return res.json({Hello: "oioi"})
})


app.listen(3333)

// usei yarn add @ pra adicionar as tipagens ao express
// yarn add typescript -D para suportar ES
// yarn tsc --init para gerar tsconfig.json
// no tsconfig.json mudei o target para es2017
// yarn add ts-node-dev -D pacote para executar typescript e node
// ao package.json adicionei campo de scripts com "dev": "ts-node-dev src/server.ts"
// alterei a linha de cima no package.json para "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts" 
// isso foi pq o typescript ficava procurando erros de código pra mostrar no console
// MUDANÇAS NO CÓDIGO.. APRENDENDO métodos do req
// yarn add typeorm sqlite3
// vantagem do sqlite é que é um banco sql que não precisa instalar nada na máquina

// FORMAS DE USAR BANCO DE DADOS:
// Driver nativo, query builder, ORM

// Driver nativo é pra escrever com comandos do banco de dado
// query builder é usando ferramentas com knex(permite usar JS p/ BD)
// No ORM temos uma classe pra cada tabela do banco de dados
// Uma vantagem de usar Query builder ou ORM, é que é possível trocar o BD usado sem precisar mudar aplicação

// no package.json "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
// para typeorm ser configurado pra typescript

// mexi no ormconfig.json
// yarn typeorm migration:create -n create_orphanages

// configurei o arquivo 1602...-create_orphanages.ts
// executei o comando yarn typeorm migration:run