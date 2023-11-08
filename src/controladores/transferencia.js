const {contas, transferencias} = require('../bancodedados');
const {format} = require('date-fns');

async function transferir(req, res) {
    const {numero_conta_origem, numero_conta_destino, valor} = req.body;

    const contaOrigem = contas.find(conta => conta.numero === Number(numero_conta_origem));
    const contaDestino = contas.find(conta => conta.numero === Number(numero_conta_destino));

    if (!contaOrigem) {
        return res.status(404).json({mensagem: "Conta de origem não encontrada."});
    }

    if (!contaDestino) {
        return res.status(404).json({mensagem: "Conta de destino não encontrada."});
    }

    if (contaOrigem.saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente na conta de origem." });
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    const dataDetransacao = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const transferencia = {
        data: dataDetransacao,
        numero_conta_origem,
        numero_conta_destino,
        valor
    };
    
    transferencias.push(transferencia);    

    res.status(200).json({mensagem: "Transferência realizada com sucesso"});
}

module.exports = transferir