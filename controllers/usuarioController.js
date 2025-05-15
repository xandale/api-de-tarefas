import { Usuario } from "../models/usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const login = async (req, res) => {
    try {
      const { email, senha } = req.body;
  
      // Valida se veio email e senha no body
      if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios." });
      }
  
      // Procura o usuário no banco pelo email
      const usuario = await Usuario.findOne({ where: { email } });
  
      // Se não achou, retorna erro
      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }
  
      // Compara a senha enviada com a senha hash do banco
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  
      // Se a senha não bateu
      if (!senhaCorreta) {
        return res.status(401).json({ erro: "Senha incorreta." });
      }
  
      // Gera o token JWT com o id do usuário
      const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1h"});
  
      // Envia o token pra quem fez login
      res.json({ mensagem: "Login realizado com sucesso!", token,});
  
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro no login." });
    }
  };

  const cadastrarUsuario = async (req, res) => {
    console.log('cadastrando usuario')
    try {
      // Pegando os dados enviados pelo cliente
      const { nome, email, senha } = req.body;
  
      // Verificação básica: campo obrigatório
      if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Nome, email e senha são obrigatórios." });
      }
  
      // Verifica se já existe um usuário com esse e-mail
      const existe = await Usuario.findOne({ where: { email } });
      if (existe) {
        return res.status(409).json({ erro: "E-mail já cadastrado." });
      }
  
      // Criptografando a senha (pra não salvar a senha pura no banco)
      const senhaHash = await bcrypt.hash(senha, 10); // 10 é o "salt rounds"
  
      // Criando o novo usuário no banco
      const novoUsuario = await Usuario.create({nome,email,senha: senhaHash, });
         // salvando a senha já criptografada

  
      // Respondendo pro front com os dados do usuário (sem a senha!)
      res.status(201).json({
        mensagem: "Usuário cadastrado com sucesso!",
        usuario: {
          id: novoUsuario.id,
          nome: novoUsuario.nome,
          email: novoUsuario.email
        }
      });
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro ao cadastrar usuário." });
    }
  };
  
  export { login, cadastrarUsuario };
