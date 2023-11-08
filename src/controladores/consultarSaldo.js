const {contas} = require('../bancodedados');

async function consultarSaldo(req, res) {
    const {numero_conta} = req.query;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: "Número da conta é obrigatório." });
    }

    const contaEncontrada = contas.find(conta => conta.numero === Number(numero_conta));

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Conta não encontrada." });
    }

    return res.status(200).json({ saldo: contaEncontrada.saldo });
}

module.exports = consultarSaldo;