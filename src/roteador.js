const express = require('express');

const listarContas = require('./controladores/listarContas');
const criarConta = require('./controladores/criarConta');
const atualizarUsuario = require('./controladores/atualizarUsuario');
const excluirConta = require('./controladores/excluirConta');
const depositar = require('./controladores/depositar');
const sacar = require('./controladores/saque');
const transferir = require('./controladores/transferencia');
const consultarSaldo = require('./controladores/consultarSaldo');
const extrato = require('./controladores/extrato');

const {senhaDoBanco, senhaSacar, senhaTransferir, senhaQuery,} = require('./intermediarios');

const rotas = express();

rotas.get('/contas', senhaDoBanco, listarContas);
rotas.post('/contas', criarConta);
rotas.put('/contas/:numeroConta/usuario', atualizarUsuario);
rotas.delete('/contas/:numeroConta', excluirConta);

rotas.post('/transacoes/depositar', depositar);
rotas.post('/transacoes/sacar', senhaSacar, sacar);
rotas.post('/transacoes/transferir', senhaTransferir, transferir);

rotas.get('/contas/saldo', senhaQuery, consultarSaldo);
rotas.get('/contas/extrato', senhaQuery, extrato);

module.exports = rotas;
