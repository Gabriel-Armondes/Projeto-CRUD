const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Conexão com MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'extensao_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Conectado!');

  const sql = `
    CREATE TABLE IF NOT EXISTS doacoes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      descricao VARCHAR(100) NOT NULL,
      quantidade INT NOT NULL,
      unidade VARCHAR(10) NOT NULL,
      cep VARCHAR(8) NOT NULL,
      retirada TINYINT(1) DEFAULT 1,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.query(sql, err => {
    if (err) throw err;
    console.log('Tabela pronta!');
  });
});

// Rotas
app.get('/api/doacoes', (req, res) => {
  db.query('SELECT * FROM doacoes ORDER BY criado_em DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/doacoes', (req, res) => {
  const { descricao, quantidade, unidade, cep, retirada } = req.body;
  const sql = 'INSERT INTO doacoes (descricao, quantidade, unidade, cep, retirada) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [descricao, quantidade, unidade, cep, retirada], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, message: 'Salvo!' });
  });
});

app.delete('/api/doacoes/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM doacoes WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Excluído!' });
  });
});

// ROTA PARA O HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

