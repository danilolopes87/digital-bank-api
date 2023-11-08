const rotas = require('./roteador');
const app = require('./servidor');

app.use(rotas);

app.listen(3000);