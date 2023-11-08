const {contas} = require('../bancodedados');

async function atualizarUsuario(req, res) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const numeroConta = Number(req.params.numeroConta);

    const contaExistente = contas.find(conta => conta.numero === numeroConta);

    if (!contaExistente) {
        return res.status(400).json({mensagem: "Não existe conta a ser substituída para o ID informado."})
    }
    
    if (nome) {
        contaExistente.usuario.nome = nome;
    }

    if (cpf) {
        const outraContaComCPF = contas.find(conta => conta.numero !== numeroConta && conta.usuario.cpf === cpf);
        if (outraContaComCPF) {
            return res.status(400).json({ mensagem: "Já existe outra conta com o mesmo CPF." });
        }
        contaExistente.usuario.cpf = cpf;
    }

    if (data_nascimento) {
        contaExistente.usuario.data_nascimento = data_nascimento;
    }

    if(telefone){
        contaExistente.usuario.telefone = telefone;
    }

    if (email) {
        const outraContaComEmail = contas.find(conta => conta.numero !== numeroConta && conta.usuario.email === email);
        if (outraContaComEmail) {
            return res.status(400).json({ mensagem: "Já existe outra conta com o mesmo E-mail." });
        }
        contaExistente.usuario.email = email;
    }

    if (senha) {
        contaExistente.usuario.senha = senha;
    }

    if (!Object.keys(req.body).length) {
        return res.status(400).json({ mensagem: "Pelo menos uma propriedade deve ser atualizada." });
    }

    if (contaExistente.cpf) {
        const outraContaComCPF = contas.find(conta => conta.numero !== Number(req.params.numeroConta) && conta.usuario.cpf === cpf);
        if (outraContaComCPF) {
            return res.status(400).json({ mensagem: "Já existe outra conta com o mesmo CPF." });
        }
    }
    
    if (contaExistente.email) {
        const outraContaComEmail = contas.find(conta => conta.numero !== numeroConta && conta.usuario.email === email);
        if (outraContaComEmail) {
            return res.status(400).json({ mensagem: "Já existe outra conta com o mesmo E-mail." });
        }
    }

    return res.status(200).json({ mensagem: "Dados atualizados com sucesso." });
}

module.exports = atualizarUsuario;