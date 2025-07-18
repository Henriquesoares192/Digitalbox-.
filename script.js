const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'banco.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

function lerBanco() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch {
    return { usuarios: [], precosMoedas: [
      { quantidade: 10, preco: 100 },
      { quantidade: 20, preco: 200 },
      { quantidade: 30, preco: 350 }
    ], historicoCompras: [] };
  }
}

function salvarBanco(dados) {
  fs.writeFileSync(DB_PATH, JSON.stringify(dados, null, 2));
}

// Cadastro
app.post('/api/cadastro', (req, res) => {
  const dados = lerBanco();
  const { nome, email, senha } = req.body;
  if (dados.usuarios.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Email já cadastrado' });
  }
  const novoUsuario = { id: Date.now(), nome, email, senha, moedas: 0 };
  dados.usuarios.push(novoUsuario);
  salvarBanco(dados);
  res.json({ success: true });
});

// Login
app.post('/api/login', (req, res) => {
  const dados = lerBanco();
  const { email, senha } = req.body;
  const user = dados.usuarios.find(u => u.email === email && u.senha === senha);
  if (user) {
    res.json({ success: true, user: { id: user.id, nome: user.nome, moedas: user.moedas } });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});

// Pegar tabela de preços
app.get('/api/precos', (req, res) => {
  const dados = lerBanco();
  res.json(dados.precosMoedas);
});

// Adicionar moedas (admin, senha fixa)
app.post('/api/addMoedas', (req, res) => {
  const dados = lerBanco();
  const { email, quantidade, senhaAdmin } = req.body;
  if (senhaAdmin !== "Henriquesenhaadminsecreta7181827") {
    return res.status(403).json({ error: 'Senha admin inválida' });
  }
  const user = dados.usuarios.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  user.moedas += Number(quantidade);
  dados.historicoCompras.push({
    usuarioId: user.id,
    quantidade: Number(quantidade),
    data: new Date().toISOString()
  });
  salvarBanco(dados);
  res.json({ success: true, moedas: user.moedas });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
