const knex = require('../../database/conexao');

const listagemTarefas = async (req, res) => {
    try {
        const tarefas = await knex('tarefas').select('*');
        if (tarefas.length > 0) {
            return res.status(200).json(tarefas);
        } else {
            return res.status(404).send('Não foi possível acessar as tarefas.');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao acessar o banco de dados.');
    }
};


const criarTarefas = async (req, res) => {
    try {
        const novaTarefa = await knex('tarefas').insert({
            nome: req.body.nome,
            datacriacao: req.body.datacriacao,
            isfinalizada: req.body.isfinalizada
        }).returning('*');

        res.status(201).json(novaTarefa[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao criar tarefa no banco de dados');
    }
};

const atualizarTarefa = async (req, res) => {
    try {
        const tarefaSelecionada = req.params.id;
        const tarefaAtualizada = req.body.tarefaAtualizada;
        const atualizacaoTarefa = await knex('tarefas').update({
            nome: tarefaAtualizada
        }).where('id', '=', tarefaSelecionada).returning('*');

        if (atualizacaoTarefa.length > 0) {
            res.status(201).json(atualizacaoTarefa);
        } else {
            res.status(404).send('Tarefa não encontrada.')
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao tentar alterar a tarefa.');
    };
};

const deletarTarefa = async (req, res) => {
    try {
        const tarefaSelecionada = req.params.id;
        const deletarTarefa = await knex('tarefas')
            .delete()
            .where('id', '=', tarefaSelecionada)
            .returning('*');
        if (deletarTarefa.length > 0) {
            res.status(201).json(deletarTarefa);
        } else {
            res.status(404).send('Tarefa não encontrada.');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocorreu algum erro ao tentar deletar a tarefa.');
    };
};

module.exports = {
    listagemTarefas,
    criarTarefas,
    atualizarTarefa,
    deletarTarefa
}