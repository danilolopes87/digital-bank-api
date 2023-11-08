const {contas} = require('./bancodedados');

function senhaDoBanco(req, res, next) {
    const {senha_banco} = req.query;

    if (!senha_banco) {
        return res.status(401).json({mensagem: "A senha não foi informada."})
    }

    if (senha_banco !== "Cubos123Bank") {
        return res.status(401).json({ mensagem: "Senha inválida." });
    }

    next();
}

function senhaSacar(req, res, next) {
    const { numero_conta, senha} = req.body;

    const contaEncontrada = contas.find(conta => conta.numero === Number(numero_conta));

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Conta não encontrada." });
    }
    
    if (senha !== contaEncontrada.usuario.senha) {
        return res.status(401).json({ mensagem: "Senha inválida." });
    }

    req.conta = contaEncontrada;

    next();
}

function senhaTransferir(req, res, next) {
    const {numero_conta_origem, senha} = req.body;

    const contaOrigem = contas.find(conta => conta.numero === Number(numero_conta_origem));

    if (!contaOrigem) {
        return res.status(404).json({mensagem: "Conta de origem não encontrada."});
    }

    if (senha !== contaOrigem.usuario.senha) {
        return res.status(401).json({ mensagem: "Senha inválida." });
    }

    req.conta = contaOrigem;

    next();
}

function senhaQuery(req, res, next) {
    const { numero_conta, senha} = req.query;

    const contaEncontrada = contas.find(conta => conta.numero === Number(numero_conta));

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: "Conta não encontrada." });
    }
    
    if (senha !== contaEncontrada.usuario.senha) {
        return res.status(401).json({ mensagem: "Senha inválida." });
    }

    req.conta = contaEncontrada;

    next();
}



module.exports = {
    senhaDoBanco,
    senhaSacar,
    senhaTransferir,
    senhaQuery
}