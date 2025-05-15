import express from 'express'
import {login, cadastrarUsuario} from '../controllers/usuarioController.js'
import { criarTarefa, listarTarefa, atualizarTarefa, deletarTarefa } from '../controllers/tarefasController.js'
import { autenticar } from "../middlewares/autenticacao.js";


export const router = express.Router()

router.post('/login', login)
router.post('/cadastro', cadastrarUsuario)

router.use(autenticar)

router.get('/tarefas', listarTarefa)
router.post('/tarefas', criarTarefa)
router.put('/tarefas/:id', atualizarTarefa)
router.delete('/tarefas/:id', deletarTarefa)
