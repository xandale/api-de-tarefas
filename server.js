import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(cors());

// ✅ CORS permitindo apenas uma origem específica
// app.use(cors({
//     origin: 'http://localhost:3000', // Só essa origem pode acessar
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
//     allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
//     credentials: true // Se quiser aceitar cookies ou headers com autenticação
//   }));

// Importar a conexao criada com sequelize
import { database } from './database.js'
import { Tarefa } from './models/tarefa.js';
import { router } from './routes/routes.js'

app.use(express.json());
app.use(router)


try{
   // await Tarefa.sync({ alter: true })
    // await Heroi.sync({ force: true })
} catch(erro){
    console.log(erro)
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
