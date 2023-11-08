const {contas} = require('../bancodedados');

function listarContas(req, res) {
    return res.status(200).json(contas);
}

module.exports = listarContas;