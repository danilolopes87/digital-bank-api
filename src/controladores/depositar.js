const {contas, depositos} = require('../bancodedados');
const {format} = require('date-fns');

async function depositar(req, res) {
    const { numero_conta, valor } = req.body;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: "Número da conta é obrigatório" });
    }

    if (!valor) {
        return res.status(400).json({ mensagem: "O valor a ser depositado é obrigatório" });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: "O valor a ser depositado deve ser maior que zero." });
    }

    const contaDeDeposito = contas.find(conta => conta.numero === Number(numero_conta));

    if (!contaDeDeposito) {
        return res.status(404).json({ mensagem: "Conta não encontrada." });
    }

    const dataAtual = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    contaDeDeposito.saldo = (contaDeDeposito.saldo || 0) + valor;

    let resposta = {
        data: dataAtual,
        numero_conta,
        valor
    }

    depositos.push(resposta);

    return res.status(200).json({mensagem: "Depósito realizado com sucesso."});
}

module.exports = depositar;