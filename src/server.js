require('dotenv').config();
const express = require('express');
const {
    listagemTarefas,
    criarTarefas,
    atualizarTarefa,
    deletarTarefa
} = require('./controllers/controllers')

const app = express();
app.use(express.json());
app.get('/tarefas', listagemTarefas);
app.post('/tarefas', criarTarefas);
app.put('/tarefas/:id', atualizarTarefa);
app.delete('/tarefas/:id', deletarTarefa);

app.listen('8000');