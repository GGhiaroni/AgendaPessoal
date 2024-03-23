const express = require('express');
const {
    listagemTarefas,
    criarTarefas,
    atualizarTarefa,
    deletarTarefa
} = require('../controllers/controllers');

const roteador = express();

roteador.get('/tarefas', listagemTarefas);
roteador.post('/tarefas', criarTarefas);
roteador.put('/tarefas/:id', atualizarTarefa);
roteador.delete('/tarefas/:id', deletarTarefa);

module.exports = roteador;