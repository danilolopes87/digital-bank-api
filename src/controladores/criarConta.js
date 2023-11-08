const {contas} = require('../bancodedados');

async function criarConta(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if (!nome) {
        return res.status(400).json({mensagem: "O nome é obrigatório"});
    };

    if (!cpf) {
        return res.status(400).json({mensagem: "O nome é obrigatório"});
    };

    if (!data_nascimento) {
        return res.status(400).json({mensagem: "A data de nascimento é obrigatória"});
    };

    if (!telefone) {
        return res.status(400).json({mensagem: "O telefone é obrigatório"});
    };

    if (!email) {
        return res.status(400).json({mensagem: "O E-mail é obrigatório"});
    };

    if (!senha) {
        return res.status(400).json({mensagem: "A senha é obrigatória"});
    };

    const cpfExistente = contas.find(conta => conta.usuario.cpf === cpf);
    const emailExistente = contas.find(conta => conta.usuario.email === email);

    if (cpfExistente) {
        return res.status(400).json({ mensagem: 'CPF já cadastrado.' });
    };

    if (emailExistente) {
        return res.status(400).json({ mensagem: 'E-mail já cadastrado.' });
    };

    let numeroConta = contas.length + 1;

    const novaConta = {
        numero: numeroConta,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }
    contas.push(novaConta);

    return res.status(201).json({
        numero: novaConta.numero,
        saldo: novaConta.saldo,
        usuario: novaConta.usuario
    });
}

module.exports = criarConta;