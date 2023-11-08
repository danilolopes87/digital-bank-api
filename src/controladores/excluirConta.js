const {contas} = require('../bancodedados');

async function excluirConta(req, res) {
    const numeroConta = Number(req.params.numeroConta);

    if (!numeroConta || isNaN(numeroConta) || numeroConta <= 0) {
        return res.status(400).json({ mensagem: "Número da conta inválido." });
    }

    const contaEncontradaIndex = contas.findIndex(conta => conta.numero === numeroConta);

    if (contaEncontradaIndex === -1) {
        return res.status(404).json({ mensagem: "Conta não encontrada." });
    }

    if (contas[contaEncontradaIndex].saldo !== 0) {
        return res.status(403).json({ mensagem: "Não é permitido excluir uma conta com saldo diferente de zero." });
    }

    contas.splice(contaEncontradaIndex, 1);

    return res.status(200).json({ mensagem: "Conta excluída com sucesso." });
}

module.exports = excluirConta;