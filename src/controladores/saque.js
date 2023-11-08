const {contas, saques} = require('../bancodedados');
const {format} = require('date-fns');

async function sacar(req, res) {
    const { numero_conta, valor } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: "Número da conta é obrigatório" });
    }

    if (!valor) {
        return res.status(400).json({ mensagem: "O valor a ser depositado é obrigatório" });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "O valor a ser sacado deve ser maior que zero." });
    }

    const contaDeSaque = contas.find(conta => conta.numero === Number(numero_conta));

    if (!contaDeSaque) {
        return res.status(404).json({ mensagem: "Conta não encontrada." });
    }

    if (contaDeSaque.saldo < valor) {
        return res.status(400).json({ mensagem: "O valor que você deseja sacar é maior que o seu saldo." });
    }

    const dataAtual = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    contaDeSaque.saldo = (contaDeSaque.saldo || 0) - valor;

    const resposta = {
        data: dataAtual,
        numero_conta,
        valor
    }

    saques.push(resposta);

    return res.status(200).json({mensagem: "Saque realizado com sucesso."});
}

module.exports = sacar;