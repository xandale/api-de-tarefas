import jwt from "jsonwebtoken";

const autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se veio o token no cabeçalho
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token não fornecido." });
  }

  const token = authHeader.split(" ")[1]; // Pega só o token sem o "Bearer"

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Coloca o ID do usuário no request pra usar nas rotas protegidas
    req.usuarioId = decoded.id;

    next(); // Libera pra rota seguir
  } catch (erro) {
    return res.status(401).json({ erro: "Token inválido ou expirado." });
  }
};

export  {autenticar}

