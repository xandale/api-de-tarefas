
import { Tarefa } from "../models/tarefa.js";

const criarTarefa = async (req, res) => {
    try {
        const { titulo, descricao } = req.body
        if (!titulo || !descricao){
            return res.status(400).json({ erro: 'Título e descrição são obrigatórios.' });
        }
        const novaTarefa = {titulo, descricao, usuario_id: req.usuarioId,}
        const tarefaCriada = await Tarefa.create(novaTarefa)
        res.status(201).send({tarefaCriada})
    }  catch (erro) {
        res.status(500).send({erro:'erro ao criar tarefa'})
        console.log(erro)
    }
}

const listarTarefa = async (req, res) => {
    try {
      // Pega todas as tarefas do usuário logado
      const tarefas = await Tarefa.findAll({where: { usuario_id: req.usuarioId },});
  
      // Se não tiver nenhuma tarefa, retorna uma mensagem amigável
      if (tarefas.length === 0) {
        return res.status(200).json({ mensagem: "Nenhuma tarefa encontrada." });
      }
      // Retorna a lista de tarefas
      res.status(200).json(tarefas);
  
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao listar tarefas." });
    }
  };
  

  const atualizarTarefa = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, status } = req.body;
  
    try {
        // garante que só atualiza se for dono
      const tarefa = await Tarefa.findOne({where: { id, usuario_id: req.usuarioId, },});

      if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada." });
      }
  
      // Atualiza os campos (só se forem enviados)
      if (titulo !== undefined) tarefa.titulo = titulo;
      if (descricao !== undefined) tarefa.descricao = descricao;
      if (status !== undefined) tarefa.status = status;
  
      await tarefa.save();
  
      res.json({ mensagem: "Tarefa atualizada com sucesso!", tarefa });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao atualizar tarefa." });
    }
  };

  const deletarTarefa = async (req, res) => {
    const { id } = req.params;
  
    try {
      const tarefa = await Tarefa.findOne({
        where: {
          id,
          usuario_id: req.usuarioId,
        },
      });
  
      if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada." });
      }
  
      await tarefa.destroy();
  
      res.json({ mensagem: "Tarefa removida com sucesso!" });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao remover tarefa." });
    }
  };
  
  export { criarTarefa, listarTarefa, atualizarTarefa, deletarTarefa };
  