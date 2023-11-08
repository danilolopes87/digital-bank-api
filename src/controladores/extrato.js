const {contas, saques, depositos, transferencias} = require('../bancodedados');

async function extrato(req, res) {
    const { numero_conta } = req.query;

    if (!numero_conta) {
        return res.status(400).json({ mensagem: "Número da conta é obrigatório." });
    }
    
    const contaEncontrada = contas.find(conta => conta.numero === Number(numero_conta));
    
    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Conta não encontrada." });
    }

    const depositosFiltrados = depositos.filter(deposito => deposito.numero_conta === numero_conta);
    const saquesFiltrados = saques.filter(saque => saque.numero_conta === numero_conta);

    const transferenciasEnviadasFiltro = transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta);
    const transferenciasRecebidasFiltro = transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta);

    const extratoConta = {
        depositos: depositosFiltrados,
        saques: saquesFiltrados,
        transferenciasEnviadas: transferenciasEnviadasFiltro,
        transferenciasRecebidas: transferenciasRecebidasFiltro
    };

    
    res.status(200).json(extratoConta);
}

module.exports = extrato;